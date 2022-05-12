import {
  ForbiddenException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { Trip } from './interface/Trip';
import { User } from 'src/user/interface/User';
import { Hotel } from 'src/hotel/interface/Hotel';
import { Flight } from 'src/flight/interface/Flight';

@Injectable()
export class TripService {
  constructor(private prisma: PrismaService) {}

  async create(createTripDto: CreateTripDto): Promise<Trip> {
    const { start, end, destination } = createTripDto;

    try {
      const created = await this.prisma.trip.create({
        data: {
          start,
          end,
          destination,
        },
      });
      return created;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // if trip exists, error P2002
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        } else {
          throw new NotAcceptableException('Error:' + error);
        }
      }
      throw new NotAcceptableException('Error:' + error);
    }
  }

  async findAll(): Promise<Trip[]> {
    try {
      const trips = await this.prisma.trip.findMany();
      // return 404 if no trips were found
      if (!trips) throw new NotFoundException();

      // sort trips by start date
      trips.sort((a, b) =>
        a.start < b.start ? -1 : a.start > b.start ? 1 : 0,
      );

      return trips;
    } catch (error) {
      return error;
    }
  }

  async findById(id: string): Promise<Trip> {
    try {
      const trip: Trip = await this.prisma.trip.findUnique({
        where: {
          id: +id,
        },
        include: {
          Events: true,
          UsersOnTrips: true,
          UsersOnHotels: true,
          UsersOnFlights: true,
        },
      });

      // return 404 if no trip was found
      if (!trip) throw new NotFoundException();

      // convert promises to single promise by using Promise.all() and then awaiting result
      const allUsers: User[] = await Promise.all(
        // find trip data for each trip in the UsersOnTrips
        trip.UsersOnTrips.map(async (trip) => {
          return await this.prisma.user.findUnique({
            where: {
              id: trip.userId,
            },
          });
        }),
      );

      function onlyUnique(value: number, index: number, self: number[]) {
        return self.indexOf(value) === index;
      }

      // convert promises to single promise by using Promise.all() and then awaiting result
      const allHotels: Hotel[] = await Promise.all(
        trip.UsersOnHotels.map((entry) => {
          return entry.hotelId;
        })
          .filter((hotelId, index, array) => onlyUnique(hotelId, index, array))
          .map(async (hotelId) => {
            const hotel: Hotel = await this.prisma.hotel.findUnique({
              where: {
                id: hotelId,
              },
              include: {
                UsersOnHotels: true,
              },
            });

            const users: User[] = await Promise.all(
              hotel.UsersOnHotels.map((entry) => {
                return entry.userId;
              })
                .filter((userId, index, array) =>
                  onlyUnique(userId, index, array),
                )
                .map(async (userId) => {
                  const user = await this.prisma.user.findUnique({
                    where: {
                      id: userId,
                    },
                  });

                  return user;
                }),
            );

            // add users to hotel
            hotel.Users = users;
            delete hotel.UsersOnHotels;
            return hotel;
          }),
      );

      // convert promises to single promise by using Promise.all() and then awaiting result
      const allFlights: Flight[] = await Promise.all(
        trip.UsersOnFlights.map((entry) => {
          return entry.flightId;
        })
          .filter((flightId, index, array) =>
            onlyUnique(flightId, index, array),
          )
          .map(async (flightId) => {
            const flight: Flight = await this.prisma.flight.findUnique({
              where: {
                id: flightId,
              },
              include: {
                UsersOnFlights: true,
              },
            });

            const users: User[] = await Promise.all(
              flight.UsersOnFlights.map((entry) => {
                return entry.userId;
              })
                .filter((userId, index, array) =>
                  onlyUnique(userId, index, array),
                )
                .map(async (userId) => {
                  const user = await this.prisma.user.findUnique({
                    where: {
                      id: userId,
                    },
                  });

                  return user;
                }),
            );

            // add users to hotel
            flight.Users = users;
            delete flight.UsersOnFlights;
            return flight;
          }),
      );

      // add users to the trips
      trip.Users = allUsers;
      // add users to the trips
      trip.Hotels = allHotels;
      // add flights to the trips
      trip.Flights = allFlights;
      // remove bridge table
      delete trip.UsersOnTrips;
      delete trip.UsersOnHotels;
      delete trip.UsersOnFlights;

      return trip;
    } catch (error) {
      return error;
    }
  }

  async update(id: string, updateTripDto: UpdateTripDto) {
    const { start, end, destination } = updateTripDto;

    try {
      const updated = this.prisma.trip.update({
        where: {
          id: +id,
        },
        data: {
          start,
          end,
          destination,
        },
      });
      return updated;
    } catch (error) {
      return error;
    }
  }

  async deleteById(id: string): Promise<Trip> {
    try {
      const deleted = this.prisma.trip.delete({
        where: {
          id: +id,
        },
      });
      return deleted;
    } catch (error) {
      return error;
    }
  }
}

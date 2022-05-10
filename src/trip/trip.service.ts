import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { Trip } from './interface/Trip';

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
      return trips;
    } catch (error) {
      return error;
    }
  }

  async findById(id: string): Promise<Trip> {
    try {
      const trip = await this.prisma.trip.findUnique({
        where: {
          id: +id,
        },
        include: {
          Hotels: true,
          Flights: true,
          Events: true,
          UsersOnTrips: true,
        },
      });
      // return 404 if no trip was found
      if (!trip) throw new NotFoundException();
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

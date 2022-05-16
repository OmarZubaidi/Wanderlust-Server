import {
  ForbiddenException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Flight } from 'src/flight/interface/Flight';
import { Hotel } from 'src/hotel/interface/Hotel';
import { PrismaService } from '../prisma/prisma.service';
import { Trip } from 'src/trip/interface/Trip';
import { CreateUserDto } from './dtos/create-user-dto';
import { UpdateUserDto } from './dtos/update-user-dto';
import { User } from './interface/User';

import * as bcrypt from 'bcrypt';
import { LoginMobileUserDto } from './dtos/login-mobile-user';
const saltRounds = process.env.BCRYPT_SALT;

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    try {
      const users = await this.prisma.user.findMany();
      // return 404 if no user was found
      if (!users) throw new NotFoundException();
      return users;
    } catch (error) {
      return error;
    }
  }

  async findById(id: string): Promise<User> {
    try {
      const user: User = await this.prisma.user.findUnique({
        where: {
          id: +id,
        },
        include: {
          UsersOnTrips: true,
          UsersOnHotels: true,
          UsersOnFlights: true,
        },
      });

      // return 404 if no user was found
      if (!user) throw new NotFoundException();

      // convert promises to single promise by using Promise.all() and then awaiting result
      const allTrips: Trip[] = await Promise.all(
        // find trip data for each trip in the UsersOnTrips
        user.UsersOnTrips.map(async (user) => {
          return await this.prisma.trip.findUnique({
            where: {
              id: user.tripId,
            },
            select: {
              id: true,
              destination: true,
              start: true,
              end: true,
              createdAt: true,
              longitude: true,
              latitude: true,
            },
          });
        }),
      );

      // convert promises to single promise by using Promise.all() and then awaiting result
      const allHotels: Hotel[] = await Promise.all(
        // find trip data for each trip in the UsersOnHotels
        user.UsersOnHotels.map(async (user) => {
          return await this.prisma.hotel.findUnique({
            where: {
              id: user.hotelId,
            },
          });
        }),
      );

      // convert promises to single promise by using Promise.all() and then awaiting result
      const allFlights: Flight[] = await Promise.all(
        // find trip data for each trip in the UsersOnHotels
        user.UsersOnFlights.map(async (user) => {
          return await this.prisma.flight.findUnique({
            where: {
              id: user.flightId,
            },
          });
        }),
      );

      // add trips to the user
      user.Trips = allTrips;
      // add hotels to the user
      user.Hotels = allHotels;
      // add hotels to the user
      user.Flights = allFlights;
      // remove bridge tables
      delete user.UsersOnTrips;
      delete user.UsersOnHotels;
      delete user.UsersOnFlights;
      // return changed user
      return user;
    } catch (error) {
      return error;
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });
      // return 404 if no user was found
      if (!user) throw new NotFoundException();
      return user;
    } catch (error) {
      return error;
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const {
      email,
      username,
      sub,
      emailVerified,
      pictureUrl,
      origin,
      mobilePassword,
    } = createUserDto;

    try {
      let hash: string;
      if (mobilePassword) {
        hash = await bcrypt.hash(mobilePassword, +saltRounds);
      }

      const user = await this.prisma.user.create({
        data: {
          email,
          username,
          sub,
          emailVerified,
          pictureUrl,
          origin,
          mobilePassword: hash,
        },
      });

      // delete password before returning
      delete user.mobilePassword;

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // if hotel exists, error P2002
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        } else {
          throw new NotAcceptableException('Error:' + error);
        }
      }
      throw new NotAcceptableException('Error:' + error);
    }
  }

  async loginMobileUser(loginMobileUserDto: LoginMobileUserDto): Promise<User> {
    const { email, mobilePassword } = loginMobileUserDto;
    try {
      // get user from db
      const user = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });

      // compare user password to hash
      const isMatch = await bcrypt.compare(mobilePassword, user.mobilePassword);
      delete user.mobilePassword;

      // if match return user else return error
      if (isMatch) {
        return user;
      } else {
        throw new ForbiddenException('Email or password are wrong!');
      }
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // if hotel exists, error P2002
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        } else {
          throw new NotAcceptableException('Error:' + error);
        }
      }
      throw new NotAcceptableException('Error:' + error);
    }
  }

  async deleteById(id: string): Promise<User> {
    try {
      const deleted = this.prisma.user.delete({
        where: {
          id: +id,
        },
      });
      return deleted;
    } catch (error) {
      return error;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const {
      email,
      username,
      sub,
      emailVerified,
      pictureUrl,
      origin,
      mobilePassword,
    } = updateUserDto;

    try {
      let hash: string;
      if (mobilePassword) {
        hash = await bcrypt.hash(mobilePassword, +saltRounds);
      }

      const updated = await this.prisma.user.update({
        where: {
          id: +id,
        },
        data: {
          email,
          username,
          sub,
          emailVerified,
          pictureUrl,
          origin,
          mobilePassword: hash,
        },
      });

      // delete password before returning
      delete updated.mobilePassword;

      return updated;
    } catch (error) {
      return error;
    }
  }
}

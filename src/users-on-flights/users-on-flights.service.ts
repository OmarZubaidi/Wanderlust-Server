import {
  ForbiddenException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateManyUsersOnFlightDto,
  CreateUsersOnFlightDto,
} from './dto/create-users-on-flights.dto';
import { UpdateUsersOnFlightsDto } from './dto/update-users-on-flights.dto';
import { UsersOnFlights } from './interface/UsersOnFlights';

@Injectable()
export class UsersOnFlightsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createUsersOnFlightDto: CreateUsersOnFlightDto,
  ): Promise<UsersOnFlights> {
    const { userId, flightId, tripId } = createUsersOnFlightDto;

    try {
      const created = await this.prisma.usersOnFlights.create({
        data: {
          userId,
          flightId,
          tripId,
        },
      });
      return created;
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

  // TODO: any
  async createMany(
    createManyUsersOnFlightDto: CreateManyUsersOnFlightDto,
  ): Promise<any> {
    const { flightId, userIds, tripId } = createManyUsersOnFlightDto;
    // remove duplicate ids
    const uniqueUserIds = new Set(userIds);
    // create data object array to store in db
    const data = Array.from(uniqueUserIds).map((user) => {
      return {
        flightId: flightId,
        userId: +user,
        tripId: +tripId,
      };
    });

    try {
      const created = await this.prisma.usersOnFlights.createMany({
        data,
      });
      return created;
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

  async findAll(): Promise<UsersOnFlights[]> {
    try {
      const usersOnFlights = await this.prisma.usersOnFlights.findMany();
      // return 404 if no usersOnFlights were found
      if (!usersOnFlights) throw new NotFoundException();
      return usersOnFlights;
    } catch (error) {
      return error;
    }
  }

  async findById(id: string): Promise<UsersOnFlights> {
    try {
      const usersOnFlights = await this.prisma.usersOnFlights.findUnique({
        where: {
          id: +id,
        },
      });
      // return 404 if no usersOnFlights was found
      if (!usersOnFlights) throw new NotFoundException();
      return usersOnFlights;
    } catch (error) {
      return error;
    }
  }

  async update(id: string, updateUsersOnFlightsDto: UpdateUsersOnFlightsDto) {
    const { userId, flightId } = updateUsersOnFlightsDto;

    try {
      const updated = this.prisma.usersOnFlights.update({
        where: {
          id: +id,
        },
        data: {
          userId,
          flightId,
        },
      });
      return updated;
    } catch (error) {
      return error;
    }
  }

  async deleteById(id: string): Promise<UsersOnFlights> {
    try {
      const deleted = this.prisma.usersOnFlights.delete({
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

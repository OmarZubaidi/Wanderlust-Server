import {
  ForbiddenException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateManyUsersOnTripDto,
  CreateUsersOnTripDto,
  DeleteManyUsersOnTripDto,
} from './dto/create-users-on-trip.dto';
import { UpdateUsersOnTripDto } from './dto/update-users-on-trip.dto';
import { UsersOnTrips } from './interface/UsersOnTrips';

@Injectable()
export class UsersOnTripsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createUsersOnTripDto: CreateUsersOnTripDto,
  ): Promise<UsersOnTrips> {
    const { userId, tripId } = createUsersOnTripDto;

    try {
      const created = await this.prisma.usersOnTrips.create({
        data: {
          userId,
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

  // TODO: prevent same users with same trip multiple times
  async createMany(
    createManyUsersOnTripDto: CreateManyUsersOnTripDto,
  ): Promise<any> {
    const { tripId, userIds } = createManyUsersOnTripDto;
    // remove duplicate ids
    const uniqueUserIds = new Set(userIds);
    // create data object array to store in db
    const data = Array.from(uniqueUserIds).map((user) => {
      return {
        tripId: tripId,
        userId: +user,
      };
    });

    try {
      const created = await this.prisma.usersOnTrips.createMany({
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

  async findAll(): Promise<UsersOnTrips[]> {
    try {
      const usersOnTrips = await this.prisma.usersOnTrips.findMany();
      // return 404 if no usersOnTrips were found
      if (!usersOnTrips) throw new NotFoundException();
      return usersOnTrips;
    } catch (error) {
      return error;
    }
  }

  async findById(id: string): Promise<UsersOnTrips> {
    try {
      const usersOnTrips = await this.prisma.usersOnTrips.findUnique({
        where: {
          id: +id,
        },
      });
      // return 404 if no usersOnTrips was found
      if (!usersOnTrips) throw new NotFoundException();
      return usersOnTrips;
    } catch (error) {
      return error;
    }
  }

  async update(id: string, updateUsersOnTripDto: UpdateUsersOnTripDto) {
    const { userId, tripId } = updateUsersOnTripDto;

    try {
      const updated = this.prisma.usersOnTrips.update({
        where: {
          id: +id,
        },
        data: {
          userId,
          tripId,
        },
      });
      return updated;
    } catch (error) {
      return error;
    }
  }

  async deleteById(id: string): Promise<UsersOnTrips> {
    try {
      const deleted = this.prisma.usersOnTrips.delete({
        where: {
          id: +id,
        },
      });
      return deleted;
    } catch (error) {
      return error;
    }
  }

  async deleteByTripAndUserId(
    deleteManyUsersOnTripDto: DeleteManyUsersOnTripDto,
  ): Promise<any> {
    const { userId, tripId } = deleteManyUsersOnTripDto;
    try {
      const deleted = await this.prisma.usersOnTrips.deleteMany({
        where: {
          userId: userId,
          tripId: tripId,
        },
      });
      return deleted;
    } catch (error) {
      return error;
    }
  }
}

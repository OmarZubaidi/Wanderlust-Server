import {
  ForbiddenException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateManyUsersOnHotelDto,
  CreateUsersOnHotelDto,
} from './dto/create-users-on-hotels.dto';
import { UpdateUsersOnHotelsDto } from './dto/update-users-on-hotels.dto';
import { UsersOnHotels } from './interface/UsersOnHotels';

@Injectable()
export class UsersOnHotelsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createUsersOnHotelDto: CreateUsersOnHotelDto,
  ): Promise<UsersOnHotels> {
    const { userId, hotelId, tripId } = createUsersOnHotelDto;

    try {
      const created = await this.prisma.usersOnHotels.create({
        data: {
          userId,
          hotelId,
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
    createManyUsersOnHotelDto: CreateManyUsersOnHotelDto,
  ): Promise<any> {
    const { hotelId, userIds, tripId } = createManyUsersOnHotelDto;
    // remove duplicate ids
    const uniqueUserIds = new Set(userIds);
    // create data object array to store in db
    const data = Array.from(uniqueUserIds).map((user) => {
      return {
        hotelId: hotelId,
        userId: +user,
        tripId: +tripId,
      };
    });

    try {
      const created = await this.prisma.usersOnHotels.createMany({
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

  async findAll(): Promise<UsersOnHotels[]> {
    try {
      const usersOnHotels = await this.prisma.usersOnHotels.findMany();
      // return 404 if no usersOnHotels were found
      if (!usersOnHotels) throw new NotFoundException();
      return usersOnHotels;
    } catch (error) {
      return error;
    }
  }

  async findById(id: string): Promise<UsersOnHotels> {
    try {
      const usersOnHotels = await this.prisma.usersOnHotels.findUnique({
        where: {
          id: +id,
        },
      });
      // return 404 if no usersOnHotels was found
      if (!usersOnHotels) throw new NotFoundException();
      return usersOnHotels;
    } catch (error) {
      return error;
    }
  }

  async update(id: string, updateUsersOnHotelsDto: UpdateUsersOnHotelsDto) {
    const { userId, hotelId } = updateUsersOnHotelsDto;

    try {
      const updated = this.prisma.usersOnHotels.update({
        where: {
          id: +id,
        },
        data: {
          userId,
          hotelId,
        },
      });
      return updated;
    } catch (error) {
      return error;
    }
  }

  async deleteById(id: string): Promise<UsersOnHotels> {
    try {
      const deleted = this.prisma.usersOnHotels.delete({
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

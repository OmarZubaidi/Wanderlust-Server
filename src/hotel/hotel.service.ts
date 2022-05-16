import {
  ForbiddenException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../prisma/prisma.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { Hotel } from './interface/Hotel';

@Injectable()
export class HotelService {
  constructor(private prisma: PrismaService) {}

  async create(createHotelDto: CreateHotelDto): Promise<Hotel> {
    const {
      name,
      location,
      longitude,
      latitude,
      arrival,
      departure,
      nights,
      priceTotal,
      hotelApiId,
      description,
      rating,
      type,
    } = createHotelDto;

    try {
      const created = await this.prisma.hotel.create({
        data: {
          name,
          location,
          longitude,
          latitude,
          arrival,
          departure,
          nights,
          priceTotal,
          hotelApiId,
          description,
          rating,
          type,
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

  async findAll(): Promise<Hotel[]> {
    try {
      const hotels = await this.prisma.hotel.findMany();
      // return 404 if no hotels were found
      if (!hotels) throw new NotFoundException();
      return hotels;
    } catch (error) {
      return error;
    }
  }

  async findById(id: string): Promise<Hotel> {
    try {
      const hotel = await this.prisma.hotel.findUnique({
        where: {
          id: +id,
        },
      });
      // return 404 if no hotel was found
      if (!hotel) throw new NotFoundException();
      return hotel;
    } catch (error) {
      return error;
    }
  }

  async findByApiId(apiId: string): Promise<Hotel[]> {
    try {
      const hotel = await this.prisma.hotel.findMany({
        where: {
          hotelApiId: apiId,
        },
        include: {
          UsersOnHotels: {
            select: {
              hotelId: true,
              tripId: true,
            },
          },
        },
      });
      // return 404 if no hotel was found
      if (!hotel) throw new NotFoundException();
      return hotel;
    } catch (error) {
      return error;
    }
  }

  async update(id: string, updateHotelDto: UpdateHotelDto) {
    const {
      name,
      location,
      longitude,
      latitude,
      arrival,
      departure,
      nights,
      priceTotal,
      hotelApiId,
      description,
      rating,
      type,
    } = updateHotelDto;

    try {
      const updated = this.prisma.hotel.update({
        where: {
          id: +id,
        },
        data: {
          name,
          location,
          longitude,
          latitude,
          arrival,
          departure,
          nights,
          priceTotal,
          hotelApiId,
          description,
          rating,
          type,
        },
      });
      return updated;
    } catch (error) {
      return error;
    }
  }

  async deleteById(id: string): Promise<Hotel> {
    try {
      const deleted = this.prisma.hotel.delete({
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

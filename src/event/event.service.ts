import {
  ForbiddenException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventType } from './interface/Event';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  async create(createEventDto: CreateEventDto): Promise<EventType> {
    try {
      const {
        title,
        start,
        end,
        allDay,
        description,
        location,
        longitude,
        latitude,
        price,
        eventApiId,
        bookingLink,
        type,
        pictures,
        rating,
        tripId,
      } = createEventDto;
      const event = await this.prisma.event.create({
        data: {
          title,
          start,
          end,
          allDay,
          description,
          location,
          longitude,
          latitude,
          price: +price,
          eventApiId,
          bookingLink,
          type,
          pictures,
          rating,
          tripId,
        },
      });
      return event;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // if event exists, error P2002
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        } else {
          throw new NotAcceptableException('Error:' + error);
        }
      } else {
        throw new NotAcceptableException('Error:' + error);
      }
    }
  }

  async findAll(): Promise<EventType[]> {
    try {
      const events = await this.prisma.event.findMany();
      // return 404 if no events were found
      if (!events) throw new NotFoundException();
      return events;
    } catch (error) {
      return error;
    }
  }

  async findById(id: string): Promise<EventType> {
    try {
      const event = await this.prisma.event.findUnique({
        where: {
          id: +id,
        },
      });
      // return 404 if no event was found
      if (!event) throw new NotFoundException();
      return event;
    } catch (error) {
      return error;
    }
  }

  async update(id: string, updateEventDto: UpdateEventDto): Promise<EventType> {
    const {
      title,
      start,
      end,
      allDay,
      description,
      location,
      longitude,
      latitude,
      price,
      eventApiId,
      bookingLink,
      type,
      pictures,
      rating,
      tripId,
    } = updateEventDto;

    try {
      const updated = this.prisma.event.update({
        where: {
          id: +id,
        },
        data: {
          title,
          start,
          end,
          allDay,
          description,
          location,
          longitude,
          latitude,
          price: +price,
          eventApiId,
          bookingLink,
          type,
          pictures,
          rating,
          tripId,
        },
      });
      return updated;
    } catch (error) {
      return error;
    }
  }

  async deleteById(id: string): Promise<EventType> {
    try {
      const deleted = this.prisma.event.delete({
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

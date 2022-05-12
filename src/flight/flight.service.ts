import {
  ForbiddenException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { Flight } from './interface/Flight';

@Injectable()
export class FlightService {
  constructor(private prisma: PrismaService) {}

  async create(createFlightDto: CreateFlightDto): Promise<Flight> {
    try {
      const {
        lengthOfFlight,
        price,
        departureCity,
        arrivalCity,
        flightApiId,
        itineraries,
      } = createFlightDto;

      const flight = await this.prisma.flight.create({
        data: {
          lengthOfFlight,
          price,
          departureCity,
          arrivalCity,
          flightApiId,
          itineraries: JSON.stringify(itineraries),
        },
      });
      return flight;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // if flight exists, error P2002
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        } else {
          throw new NotAcceptableException('Error:' + error);
        }
      }
      throw new NotAcceptableException('Error:' + error);
    }
  }

  async findAll(): Promise<Flight[]> {
    try {
      const flights = await this.prisma.flight.findMany();
      // return 404 if no flights were found
      if (!flights) throw new NotFoundException();
      return flights;
    } catch (error) {
      return error;
    }
  }

  async findById(id: string): Promise<Flight> {
    try {
      const flight = await this.prisma.flight.findUnique({
        where: {
          id: +id,
        },
      });
      // return 404 if no flight was found
      if (!flight) throw new NotFoundException();
      return flight;
    } catch (error) {
      return error;
    }
  }

  async update(id: string, updateFlightDto: UpdateFlightDto): Promise<Flight> {
    const {
      lengthOfFlight,
      price,
      departureCity,
      arrivalCity,
      flightApiId,
      itineraries,
    } = updateFlightDto;

    try {
      const updated = this.prisma.flight.update({
        where: {
          id: +id,
        },
        data: {
          lengthOfFlight,
          price,
          departureCity,
          arrivalCity,
          flightApiId,
          itineraries: JSON.stringify(itineraries),
        },
      });
      return updated;
    } catch (error) {
      return error;
    }
  }

  async deleteById(id: string): Promise<Flight> {
    try {
      const deleted = this.prisma.flight.delete({
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

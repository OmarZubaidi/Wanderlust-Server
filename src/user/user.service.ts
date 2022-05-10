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
import { CreateUserDto } from './dtos/create-user-dto';
import { UpdateUserDto } from './dtos/update-user-dto';
import { User } from './interface/User';

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
      const user = await this.prisma.user.findUnique({
        where: {
          id: +id,
        },
        include: {
          Hotels: true,
          Flights: true,
          UsersOnTrips: true,
        },
      });
      // return 404 if no user was found
      if (!user) throw new NotFoundException();
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
    try {
      const user = await this.prisma.user.create({
        data: {
          email: createUserDto.email,
          username: createUserDto.username,
          sub: createUserDto.sub,
          emailVerified: createUserDto.emailVerified,
          pictureUrl: createUserDto.pictureUrl,
          origin: createUserDto.origin,
        },
      });
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
    const { email, username, sub, emailVerified, pictureUrl, origin } =
      updateUserDto;
    try {
      const updated = this.prisma.user.update({
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
        },
      });
      return updated;
    } catch (error) {
      return error;
    }
  }
}

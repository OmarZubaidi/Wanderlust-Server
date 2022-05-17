import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from '../src/app.module';
import * as pactum from 'pactum';
import { CreateUserDto } from 'src/user/dtos/create-user-dto';
import { UpdateUserDto } from '../src/user/dtos/update-user-dto';
import { CreateTripDto } from '../src/trip/dto/create-trip.dto';
import { UpdateTripDto } from '../src/trip/dto/update-trip.dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    await app.init();
    await app.listen(3335);

    prisma = app.get(PrismaService);
    pactum.request.setBaseUrl('http://localhost:3335');
  });

  afterAll(async () => {
    app.close();
    prisma = app.get(PrismaService);
    await prisma.user.deleteMany({});
    await prisma.trip.deleteMany({});
  });

  describe('User', () => {
    const createUserDto: CreateUserDto = {
      email: 'tester@email.com',
      username: 'string',
      sub: 'sub-mockuser',
      emailVerified: false,
      pictureUrl: 'string',
      origin: 'string',
      mobilePassword: null,
    };

    const updateUserDto: UpdateUserDto = {
      username: 'Hans',
      pictureUrl: 'new url',
      emailVerified: true,
    };

    it('should create a user and return it', async () => {
      return pactum
        .spec()
        .post('/users')
        .withBody(createUserDto)
        .expectStatus(201)
        .expectJsonLike({
          id: /\d+/,
          email: 'tester@email.com',
          username: 'string',
          sub: 'sub-mockuser',
          emailVerified: false,
          pictureUrl: 'string',
          origin: 'string',
          createdAt: /\w+/,
        });
    });

    it('should find a user by email and return it', async () => {
      prisma = app.get(PrismaService);
      const user = await prisma.user.findUnique({
        where: {
          email: 'tester@email.com',
        },
      });

      return pactum.spec().get(`/users/${user.id}`).expectStatus(200);
    });

    it('should update the user and return the user', async () => {
      prisma = app.get(PrismaService);
      const user = await prisma.user.findUnique({
        where: {
          email: 'tester@email.com',
        },
      });

      return pactum
        .spec()
        .patch(`/users/${user.id}`)
        .withBody(updateUserDto)
        .expectStatus(200)
        .expectJsonLike({
          id: /\d+/,
          username: 'Hans',
          pictureUrl: 'new url',
          emailVerified: true,
          createdAt: /\w+/,
        });
    });

    it('should delete the user and return it', async () => {
      prisma = app.get(PrismaService);
      const user = await prisma.user.findUnique({
        where: {
          email: 'tester@email.com',
        },
      });

      return pactum.spec().delete(`/users/${user.id}`).expectStatus(200);
    });

    it('should not find deleted user', async () => {
      prisma = app.get(PrismaService);
      const user = await prisma.user.findUnique({
        where: {
          email: 'tester@email.com',
        },
      });

      expect(user).toBeFalsy();
    });
  });

  describe('Trip', () => {
    // TODO: figure out what the right type for date is
    // const createTripDto: CreateTripDto = {
    //   start: new Date("1970-01-01T00:00:00.000Z"),
    //   end: new Date("1970-01-01T00:00:00.000Z"),
    //   destination: 'Barcelona',
    //   latitude: 25.2653471,
    //   longitude: 55.2924914,
    // };
    // const updateTripDto: UpdateTripDto = {
    //   destination: 'Berlin',
    // };
    // it.only('should create a trip and return it', async () => {
    //   return pactum
    //     .spec()
    //     .post('/trips')
    //     .withBody(createTripDto)
    //     .expectStatus(201)
    //     .expectJsonLike({
    //       id: /\d+/,
    //       start: /\w+/,
    //       end: /\w+/,
    //       destination: 'Barcelona',
    //       latitude: 25.2653471,
    //       longitude: 55.2924914,
    //       createdAt: /\w+/,
    //     });
    // });
    // it('should find a trip by id and return it', async () => {
    //   prisma = app.get(PrismaService);
    //   const trip = await prisma.trip.findUnique({
    //     where: {
    //       id: 1,
    //     },
    //   });
    //   return pactum.spec().get(`/trips/${trip.id}`).expectStatus(200);
    // });
    // it('should update the trip and return the trip', async () => {
    //   prisma = app.get(PrismaService);
    //   const trip = await prisma.trip.findUnique({
    //     where: {
    //       id: 1,
    //     },
    //   });
    //   return pactum
    //     .spec()
    //     .patch(`/trips/${trip.id}`)
    //     .withBody(updateTripDto)
    //     .expectStatus(200)
    //     .expectJsonLike({
    //       id: /\d+/,
    //       start: /\w+/,
    //       end: /\w+/,
    //       destination: 'Berlin',
    //       latitude: 25.2653471,
    //       longitude: 55.2924914,
    //       createdAt: /\w+/,
    //     });
    // });
    // it('should delete the trip and return it', async () => {
    //   prisma = app.get(PrismaService);
    //   const trip = await prisma.trip.findUnique({
    //     where: {
    //       id: 1,
    //     },
    //   });
    //   return pactum.spec().delete(`/trips/${trip.id}`).expectStatus(200);
    // });
    // it('should not find deleted trip', async () => {
    //   prisma = app.get(PrismaService);
    //   const trip = await prisma.trip.findUnique({
    //     where: {
    //       id: 1,
    //     },
    //   });
    //   expect(trip).toBeFalsy();
    // });
  });
});

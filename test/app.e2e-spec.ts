import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from '../src/app.module';
import * as pactum from 'pactum';
import { CreateUserDto } from '../src/user/dtos/create-user-dto';
import { UpdateUserDto } from '../src/user/dtos/update-user-dto';
import { CreateTripDto } from '../src/trip/dto/create-trip.dto';
import { UpdateTripDto } from '../src/trip/dto/update-trip.dto';
import { CreateHotelDto } from '../src/hotel/dto/create-hotel.dto';
import { UpdateHotelDto } from '../src/hotel/dto/update-hotel.dto';
import { CreateEventDto } from 'src/event/dto/create-event.dto';
import { UpdateEventDto } from 'src/event/dto/update-event.dto';

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
    await prisma.hotel.deleteMany({});
    await prisma.event.deleteMany({});
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
    const createTripDto: CreateTripDto = {
      start: '1970-01-01T00:00:00.000Z',
      end: '1970-01-01T00:00:00.000Z',
      destination: 'Barcelona',
      latitude: 25.2653471,
      longitude: 55.2924914,
    };

    const updateTripDto: UpdateTripDto = {
      destination: 'Berlin',
    };

    it('should create a trip and return it', async () => {
      return pactum
        .spec()
        .post('/trips')
        .withBody(createTripDto)
        .expectStatus(201)
        .inspect()
        .expectJsonLike({
          id: /\d+/,
          start: /\w+/,
          end: /\w+/,
          destination: 'Barcelona',
          latitude: 25.2653471,
          longitude: 55.2924914,
          createdAt: /\w+/,
        });
    });

    it('should find a trip by id and return it', async () => {
      prisma = app.get(PrismaService);
      const trip = await prisma.trip.findFirst();
      return pactum.spec().get(`/trips/${trip.id}`).expectStatus(200);
    });

    it('should update the trip and return the trip', async () => {
      prisma = app.get(PrismaService);
      const trip = await prisma.trip.findFirst();
      return pactum
        .spec()
        .patch(`/trips/${trip.id}`)
        .withBody(updateTripDto)
        .expectStatus(200)
        .expectJsonLike({
          id: /\d+/,
          start: /\w+/,
          end: /\w+/,
          destination: 'Berlin',
          latitude: 25.2653471,
          longitude: 55.2924914,
          createdAt: /\w+/,
        });
    });

    it('should delete the trip and return it', async () => {
      prisma = app.get(PrismaService);
      const trip = await prisma.trip.findFirst();
      return pactum.spec().delete(`/trips/${trip.id}`).expectStatus(200);
    });

    it('should not find deleted trip', async () => {
      prisma = app.get(PrismaService);
      const trip = await prisma.trip.findFirst();
      expect(trip).toBeFalsy();
    });
  });

  describe('Hotel', () => {
    const createHotelDto: CreateHotelDto = {
      name: 'Grand Omar Hotel',
      location: 'BERGARA 8',
      latitude: 41.38629,
      longitude: 2.16844,
      arrival: '2022-05-30T00:00:00.000Z',
      departure: '2022-06-02T00:00:00.000Z',
      nights: 3,
      priceTotal: 555,
      description:
        'Our rooms are designed with “healthy intention” of trying to make the client forget he is sleeping in a hotel. They are fully equipped with everything to guarantee the utmost comfort during your stay (Plasma TV, ADSL/ WIFI, Minibar, Dressing gowns, Hair Dryer, etc...) and they are controlled by a domotic system that offers the guests the possibility to regulate temperature and light as they wish. We provide you VISIT Restaurant which combines the best Mediterranean cuisine blended with subtle oriental touches. In the other hand, discover our terrace where you can enjoy the end of the night underneath the stars. We also have a lobby-library, full of quiet and comfortable spaces, and a big wood table that convert this space in the perfect one to organize informal work meetings. Our guests are offered the free entrance to Holmes Place Gym-Spa, very close to the hotel.',
      rating: '4',
      type: 'hotel',
      hotelApiId: 'WVBCN014',
    };

    const updateHotelDto: UpdateHotelDto = {
      location: 'Bergara 8',
      nights: 5,
      priceTotal: 325,
    };

    it('should create a hotel and return it', async () => {
      return pactum
        .spec()
        .post('/hotels')
        .withBody(createHotelDto)
        .expectStatus(201)
        .inspect()
        .expectJsonLike({
          id: /\d+/,
          name: 'Grand Omar Hotel',
          location: 'BERGARA 8',
          latitude: 41.38629,
          longitude: 2.16844,
          arrival: '2022-05-30T00:00:00.000Z',
          departure: '2022-06-02T00:00:00.000Z',
          nights: 3,
          priceTotal: 555,
          description:
            'Our rooms are designed with “healthy intention” of trying to make the client forget he is sleeping in a hotel. They are fully equipped with everything to guarantee the utmost comfort during your stay (Plasma TV, ADSL/ WIFI, Minibar, Dressing gowns, Hair Dryer, etc...) and they are controlled by a domotic system that offers the guests the possibility to regulate temperature and light as they wish. We provide you VISIT Restaurant which combines the best Mediterranean cuisine blended with subtle oriental touches. In the other hand, discover our terrace where you can enjoy the end of the night underneath the stars. We also have a lobby-library, full of quiet and comfortable spaces, and a big wood table that convert this space in the perfect one to organize informal work meetings. Our guests are offered the free entrance to Holmes Place Gym-Spa, very close to the hotel.',
          rating: '4',
          type: 'hotel',
          hotelApiId: 'WVBCN014',
          createdAt: /\w+/,
        });
    });

    it('should find a hotel by id and return it', async () => {
      prisma = app.get(PrismaService);
      const hotel = await prisma.hotel.findFirst();
      return pactum.spec().get(`/hotels/${hotel.id}`).expectStatus(200);
    });

    it('should update the hotel and return the hotel', async () => {
      prisma = app.get(PrismaService);
      const hotel = await prisma.hotel.findFirst();
      return pactum
        .spec()
        .patch(`/hotels/${hotel.id}`)
        .withBody(updateHotelDto)
        .expectStatus(200)
        .expectJsonLike({
          id: /\d+/,
          name: 'Grand Omar Hotel',
          location: 'Bergara 8',
          latitude: 41.38629,
          longitude: 2.16844,
          arrival: '2022-05-30T00:00:00.000Z',
          departure: '2022-06-02T00:00:00.000Z',
          nights: 5,
          priceTotal: 325,
          description:
            'Our rooms are designed with “healthy intention” of trying to make the client forget he is sleeping in a hotel. They are fully equipped with everything to guarantee the utmost comfort during your stay (Plasma TV, ADSL/ WIFI, Minibar, Dressing gowns, Hair Dryer, etc...) and they are controlled by a domotic system that offers the guests the possibility to regulate temperature and light as they wish. We provide you VISIT Restaurant which combines the best Mediterranean cuisine blended with subtle oriental touches. In the other hand, discover our terrace where you can enjoy the end of the night underneath the stars. We also have a lobby-library, full of quiet and comfortable spaces, and a big wood table that convert this space in the perfect one to organize informal work meetings. Our guests are offered the free entrance to Holmes Place Gym-Spa, very close to the hotel.',
          rating: '4',
          type: 'hotel',
          hotelApiId: 'WVBCN014',
          createdAt: /\w+/,
        });
    });

    it('should delete the hotel and return it', async () => {
      prisma = app.get(PrismaService);
      const hotel = await prisma.hotel.findFirst();
      return pactum.spec().delete(`/hotels/${hotel.id}`).expectStatus(200);
    });

    it('should not find deleted hotel', async () => {
      prisma = app.get(PrismaService);
      const hotel = await prisma.hotel.findFirst();
      expect(hotel).toBeFalsy();
    });
  });
});

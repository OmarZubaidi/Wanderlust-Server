import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from '../src/app.module';
import * as pactum from 'pactum';
import { CreateUserDto } from 'src/user/dtos/create-user-dto';

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

    it('should create a user and return it', async () => {
      pactum
        .spec()
        .post('/users')
        .withBody(createUserDto)
        .expectStatus(201)
        .inspect()
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
  });
});

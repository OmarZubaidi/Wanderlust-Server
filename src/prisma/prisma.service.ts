import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
// inherit configurations from PrismaClient
export class PrismaService extends PrismaClient {
  // config to get access to .env
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          // connect to prisma db
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }
}

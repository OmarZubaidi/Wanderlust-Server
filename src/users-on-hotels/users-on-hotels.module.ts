import { Module } from '@nestjs/common';
import { UsersOnHotelsService } from './users-on-hotels.service';
import { UsersOnHotelsController } from './users-on-hotels.controller';

@Module({
  controllers: [UsersOnHotelsController],
  providers: [UsersOnHotelsService],
})
export class UsersOnHotelsModule {}

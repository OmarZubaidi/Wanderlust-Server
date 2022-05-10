import { Module } from '@nestjs/common';
import { UsersOnTripsService } from './users-on-trips.service';
import { UsersOnTripsController } from './users-on-trips.controller';

@Module({
  controllers: [UsersOnTripsController],
  providers: [UsersOnTripsService],
})
export class UsersOnTripsModule {}

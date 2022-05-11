import { Module } from '@nestjs/common';
import { UsersOnFlightsService } from './users-on-flights.service';
import { UsersOnFlightsController } from './users-on-flights.controller';

@Module({
  controllers: [UsersOnFlightsController],
  providers: [UsersOnFlightsService],
})
export class UsersOnFlightModule {}

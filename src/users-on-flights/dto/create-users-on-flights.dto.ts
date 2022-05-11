import { IsArray, IsNumber } from 'class-validator';

export class CreateUsersOnFlightDto {
  @IsNumber()
  userId: number;
  @IsNumber()
  tripId: number;
  @IsNumber()
  flightId: number;
}

export class CreateManyUsersOnFlightDto {
  @IsNumber()
  flightId: number;
  @IsNumber()
  tripId: number;
  @IsArray()
  userIds: number[];
}

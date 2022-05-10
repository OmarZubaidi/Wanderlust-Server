import { IsArray, IsNumber } from 'class-validator';

export class CreateUsersOnTripDto {
  @IsNumber()
  userId: number;
  @IsNumber()
  tripId: number;
}

export class CreateManyUsersOnTripDto {
  @IsNumber()
  tripId: number;
  @IsArray()
  userIds: number[];
}

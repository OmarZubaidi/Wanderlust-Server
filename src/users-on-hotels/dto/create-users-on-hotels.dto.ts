import { IsArray, IsNumber } from 'class-validator';

export class CreateUsersOnHotelDto {
  @IsNumber()
  userId: number;
  @IsNumber()
  tripId: number;
  @IsNumber()
  hotelId: number;
}

export class CreateManyUsersOnHotelDto {
  @IsNumber()
  hotelId: number;
  @IsNumber()
  tripId: number;
  @IsArray()
  userIds: number[];
}

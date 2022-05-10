import { IsString, IsDate, IsNumber } from 'class-validator';

export class CreateHotelDto {
  @IsString()
  name: string;
  @IsString()
  location: string;
  @IsString()
  coordinates: string;
  @IsDate()
  arrival: Date;
  @IsDate()
  departure: Date;
  @IsNumber()
  nights: number;
  @IsString()
  priceTotal: string;
  @IsNumber()
  hotelApiId: number;
  @IsNumber()
  userId: number;
  @IsNumber()
  tripId: number;
}

import { IsString, IsDate, IsNumber } from 'class-validator';

export class CreateHotelDto {
  @IsString()
  name: string;
  @IsString()
  location: string;
  @IsNumber()
  longitude: number;
  @IsNumber()
  latitude: number;
  @IsDate()
  arrival: Date;
  @IsDate()
  departure: Date;
  @IsNumber()
  nights: number;
  @IsNumber()
  priceTotal: string;
  @IsString()
  hotelApiId: string;
  @IsString()
  description: string;
  @IsString()
  rating: string;
  @IsString()
  type: string;
}

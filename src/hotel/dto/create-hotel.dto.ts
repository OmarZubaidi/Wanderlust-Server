import { IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateHotelDto {
  @IsString()
  name: string;
  @IsString()
  location: string;
  @IsNumber()
  latitude: number;
  @IsNumber()
  longitude: number;
  @IsDateString()
  arrival: string;
  @IsDateString()
  departure: string;
  @IsNumber()
  nights: number;
  @IsNumber()
  priceTotal: number;
  @IsString()
  hotelApiId: string;
  @IsString()
  description: string;
  @IsString()
  rating: string;
  @IsString()
  type: string;
}

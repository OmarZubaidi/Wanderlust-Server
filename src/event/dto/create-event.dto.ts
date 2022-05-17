import { IsString, IsNumber, IsBoolean, IsDateString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  title: string;
  @IsDateString()
  start: string;
  @IsDateString()
  end: string;
  @IsBoolean()
  allDay: boolean;
  @IsString()
  description: string;
  @IsString()
  location: string;
  @IsNumber()
  longitude: number;
  @IsNumber()
  latitude: number;
  @IsNumber()
  price: number;
  @IsNumber()
  eventApiId: number;
  @IsString()
  bookingLink: string;
  @IsString()
  type: string;
  @IsString()
  pictures: string;
  @IsNumber()
  rating: number;
  @IsNumber()
  tripId: number;
}

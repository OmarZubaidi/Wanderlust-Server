import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateTripDto {
  @IsDateString()
  start: string;
  @IsDateString()
  end: string;
  @IsString()
  destination: string;
  @IsNumber()
  longitude: number;
  @IsNumber()
  latitude: number;
}

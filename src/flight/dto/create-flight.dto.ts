import { IsString, IsDate, IsNumber } from 'class-validator';

export class CreateFlightDto {
  @IsDate()
  departure: Date;
  @IsDate()
  arrival: Date;
  @IsString()
  gate: string;
  @IsString()
  depAirport: string;
  @IsString()
  arrAirport: string;
  @IsString()
  lengthOfFlight: string;
  @IsString()
  price: string;
  @IsNumber()
  flightApiId: number;
}

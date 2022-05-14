import { Type } from 'class-transformer';
import {
  IsString,
  IsJSON,
  IsNumber,
  IsOptional,
  IsDate,
  ValidateNested,
} from 'class-validator';

export class CreateFlightDto {
  @IsString()
  lengthOfFlight: string;
  @IsNumber()
  price: string;
  @IsString()
  departureCity: string;
  @IsString()
  arrivalCity: string;
  @IsNumber()
  flightApiId: number;
  @IsJSON()
  @ValidateNested({ each: true })
  @Type(() => ItineraryDto)
  itineraries: ItineraryDto[];
}

export class ItineraryDto {
  @IsString()
  depAirport: string;
  @IsString()
  arrAirport: string;
  @IsOptional()
  @IsString()
  depTerminal: string;
  @IsOptional()
  @IsString()
  arrTerminal: string;
  @IsDate()
  departure: Date;
  @IsDate()
  arrival: Date;
}

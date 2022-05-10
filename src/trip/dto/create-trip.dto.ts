import { IsDate, IsString } from 'class-validator';

export class CreateTripDto {
  @IsDate()
  start: Date;
  @IsDate()
  end: Date;
  @IsString()
  destination: string;
}

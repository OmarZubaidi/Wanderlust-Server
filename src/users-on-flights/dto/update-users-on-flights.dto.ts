import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersOnFlightDto } from './create-users-on-flights.dto';

export class UpdateUsersOnFlightsDto extends PartialType(
  CreateUsersOnFlightDto,
) {}

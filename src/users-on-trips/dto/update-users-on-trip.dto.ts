import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersOnTripDto } from './create-users-on-trip.dto';

export class UpdateUsersOnTripDto extends PartialType(CreateUsersOnTripDto) {}

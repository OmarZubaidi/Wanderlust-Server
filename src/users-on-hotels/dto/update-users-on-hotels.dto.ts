import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersOnHotelDto } from './create-users-on-hotels.dto';

export class UpdateUsersOnHotelsDto extends PartialType(
  CreateUsersOnHotelDto,
) {}

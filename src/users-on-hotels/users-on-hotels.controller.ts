import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersOnHotelsService } from './users-on-hotels.service';
import {
  CreateManyUsersOnHotelDto,
  CreateUsersOnHotelDto,
} from './dto/create-users-on-hotels.dto';
import { UpdateUsersOnHotelsDto } from './dto/update-users-on-hotels.dto';

@Controller('users-on-hotels')
export class UsersOnHotelsController {
  constructor(private readonly usersOnHotelsService: UsersOnHotelsService) {}

  @Post()
  create(@Body() createUsersOnHotelDto: CreateUsersOnHotelDto) {
    return this.usersOnHotelsService.create(createUsersOnHotelDto);
  }

  @Post('/many')
  createMany(@Body() createManyUsersOnHotelDto: CreateManyUsersOnHotelDto) {
    return this.usersOnHotelsService.createMany(createManyUsersOnHotelDto);
  }

  @Get()
  findAll() {
    return this.usersOnHotelsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.usersOnHotelsService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUsersOnHotelsDto: UpdateUsersOnHotelsDto,
  ) {
    return this.usersOnHotelsService.update(id, updateUsersOnHotelsDto);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.usersOnHotelsService.deleteById(id);
  }
}

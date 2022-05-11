import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersOnFlightsService } from './users-on-flights.service';
import {
  CreateManyUsersOnFlightDto,
  CreateUsersOnFlightDto,
} from './dto/create-users-on-flights.dto';
import { UpdateUsersOnFlightsDto } from './dto/update-users-on-flights.dto';

@Controller('users-on-flights')
export class UsersOnFlightsController {
  constructor(private readonly usersOnFlightsService: UsersOnFlightsService) {}

  @Post()
  create(@Body() createUsersOnFlightDto: CreateUsersOnFlightDto) {
    return this.usersOnFlightsService.create(createUsersOnFlightDto);
  }

  @Post('/many')
  createMany(@Body() createManyUsersOnFlightDto: CreateManyUsersOnFlightDto) {
    return this.usersOnFlightsService.createMany(createManyUsersOnFlightDto);
  }

  @Get()
  findAll() {
    return this.usersOnFlightsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.usersOnFlightsService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUsersOnFlightsDto: UpdateUsersOnFlightsDto,
  ) {
    return this.usersOnFlightsService.update(id, updateUsersOnFlightsDto);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.usersOnFlightsService.deleteById(id);
  }
}

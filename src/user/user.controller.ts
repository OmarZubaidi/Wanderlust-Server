import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dtos/create-user-dto';
import { LoginMobileUserDto } from './dtos/login-mobile-user';
import { UpdateUserDto } from './dtos/update-user-dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Get('/email/:email')
  findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  // TODO: Add for important routes
  // @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('/login/mobile')
  loginMobileUser(@Body() loginMobileUserDto: LoginMobileUserDto) {
    return this.userService.loginMobileUser(loginMobileUserDto);
  }

  // TODO: Add for important routes
  // @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.userService.deleteById(id);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
}

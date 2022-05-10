import { IsString, IsEmail, IsBoolean, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;
  @IsString()
  username: string;
  @IsString()
  sub: string;
  @IsBoolean()
  emailVerified: boolean;
  @IsString()
  pictureUrl: string;
  @IsString()
  @IsOptional()
  origin: string;
}

import { IsEmail, IsOptional } from 'class-validator';

export class LoginMobileUserDto {
  @IsEmail()
  email: string;
  @IsOptional()
  mobilePassword: string;
}

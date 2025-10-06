import { IsEmail, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  avatar?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

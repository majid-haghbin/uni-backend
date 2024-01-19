import { IsNotEmpty, IsNumberString, IsString } from 'class-validator'

export class LoginDto {
  @IsNotEmpty()
  @IsNumberString()
  username: string

  @IsNotEmpty()
  @IsString()
  password: string
}

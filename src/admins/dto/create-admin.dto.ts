import { IsNotEmpty, IsString, IsIn, IsNumberString, IsEmail } from "class-validator"
import { Role, roles } from "src/users/dto/users.dto"

/** برای ایجاد ادمین */
export class CreateAdminDTO {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  family: string

  @IsNotEmpty()
  @IsString()
  @IsIn(roles)
  role: Role

  @IsNotEmpty()
  @IsString()
  fatherName: string

  @IsNotEmpty()
  @IsNumberString()
  mobile: string

  @IsNotEmpty()
  @IsEmail()
  email: string
}
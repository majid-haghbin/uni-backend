import { IsNotEmpty, IsString, IsIn, IsNumberString, IsEmail, IsOptional, IsInt } from "class-validator"

/** برای ایجاد استاد */
export class CreateProfessorDTO {
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  ID: number

  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  family: string

  @IsNotEmpty()
  @IsString()
  fatherName: string

  @IsNotEmpty()
  @IsNumberString()
  mobile: string

  @IsNotEmpty()
  @IsEmail({}, { message: 'ایمیل را صحیح وارد کنید' })
  email: string

  @IsNotEmpty()
  @IsNumberString()
  dateOfEmployment: string

  @IsNotEmpty()
  password: string
}
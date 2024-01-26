import { IsNotEmpty, IsString, IsNumberString, IsEmail, IsInt, IsOptional } from "class-validator"

/** برای ایجاد دانشجو */
export class CreateStudentDTO {
  @IsOptional()
  @IsInt()
  ID: number

  @IsNotEmpty()
  @IsInt()
  majorID: number

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
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsNumberString()
  birthDate: string

  @IsNotEmpty()
  @IsNumberString()
  code: string

  @IsNotEmpty()
  @IsString()
  password: string
}
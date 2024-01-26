import { IsNotEmpty, IsString, IsInt } from "class-validator"

/** برای ایجاد درس */
export class CreateLessonDTO {
  @IsNotEmpty()
  @IsInt()
  majorID: number

  @IsNotEmpty()
  @IsInt()
  professorID: number

  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsInt()
  unit: number
}
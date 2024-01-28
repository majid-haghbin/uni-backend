import { IsNotEmpty, IsInt } from "class-validator"

export class ExamListDto {
  @IsNotEmpty()
  @IsInt()
  lessonID: number
}
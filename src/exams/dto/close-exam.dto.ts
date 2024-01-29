import { IsNotEmpty, IsInt } from "class-validator"

export class CloseExamDto {
  @IsNotEmpty()
  @IsInt()
  examID: number
}
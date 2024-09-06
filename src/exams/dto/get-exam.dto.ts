import { IsNotEmpty, IsInt } from "class-validator"

export class GetExamDto {
  @IsNotEmpty()
  @IsInt()
  examID: number
}
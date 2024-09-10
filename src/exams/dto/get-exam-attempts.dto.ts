import { IsNotEmpty, IsInt } from "class-validator"

export class GetExamAttemptsDto {
  @IsNotEmpty()
  @IsInt()
  examID: number
}
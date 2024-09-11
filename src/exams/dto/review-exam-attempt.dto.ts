import { IsNotEmpty, IsInt } from "class-validator"

export class ReviewAttemptDto {
  @IsNotEmpty()
  @IsInt()
  examID: number

  @IsNotEmpty()
  @IsInt()
  attemptID: number
}
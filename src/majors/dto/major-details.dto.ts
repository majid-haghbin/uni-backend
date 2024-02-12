import { IsNotEmpty, IsInt } from "class-validator"

/** برای جزئیات رشته تحصیلی */
export class MajorDetailsDTO {
  @IsNotEmpty()
  @IsInt()
  majorID: number
}
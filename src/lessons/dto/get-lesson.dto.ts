import { IsNotEmpty, IsInt } from "class-validator"

/** برای دریافت جزئیات درس */
export class GetLessonDTO {
  @IsNotEmpty()
  @IsInt()
  lessonID: number
}
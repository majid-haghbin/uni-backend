import { IsNotEmpty, IsInt } from "class-validator"

/** برای حذف کردن دانشجو از یک درس */
export class RemoveFromLessonDTO {
  @IsNotEmpty()
  @IsInt()
  studentID: number

  @IsNotEmpty()
  @IsInt()
  lessonID: number
}
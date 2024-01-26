import { IsNotEmpty, IsInt } from "class-validator"

/** برای اضافه کردن دانشجو به یک درس */
export class AddToLessonDTO {
  @IsNotEmpty()
  @IsInt()
  studentID: number

  @IsNotEmpty()
  @IsInt()
  lessonID: number
}
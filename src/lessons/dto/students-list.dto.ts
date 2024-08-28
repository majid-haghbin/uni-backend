import { IsInt, IsOptional } from "class-validator"

/** برای دریافت لیست دانشجویان درس توسط استاد یا ادمین */
export class ListStudentsDTO {
  @IsInt()
  lessonID: number
}
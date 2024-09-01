import { IsInt, IsOptional } from "class-validator"

/** 
 * برای گرفتن لیست دانشجویان پروژه توسط ادمین
 */
export class StudentsAdminList {
  /** اگر مقدار اختیاری ارسال شود یعنی دانشجویانی را می‌خواهیم که عضو این درس نباشند */
  @IsOptional()
  @IsInt()
  notInLesson: number
}
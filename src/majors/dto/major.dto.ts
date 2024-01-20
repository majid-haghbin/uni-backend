import { IsNotEmpty, IsString, IsInt, IsOptional } from "class-validator"

/** برای ایجاد رشته تحصیلی */
export class CreateMajorDTO {
  /** برای ویرایش ارسال می‌شود */
  @IsOptional()
  @IsInt()
  id: number

  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsInt()
  minimumUnits: number
}
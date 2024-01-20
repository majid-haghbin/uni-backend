import { IsNotEmpty, IsString, IsInt,  } from "class-validator"

/** برای ایجاد رشته تحصیلی */
export class CreateMajorDTO {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsInt()
  minimumUnits: number
}
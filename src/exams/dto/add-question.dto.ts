import {
  IsNotEmpty,
  IsInt,
  IsNumber,
  IsString,
  ValidateIf,
  IsBoolean,
  IsArray,
  ValidateNested,
  ArrayMinSize,
  ArrayMaxSize } from "class-validator"
import { Type } from "class-transformer"

export class ChoiceDto {
  @IsNotEmpty()
  @IsString()
  text: string
}

export class AddQuestionDto {
  @IsNotEmpty()
  @IsInt()
  examID: number

  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsBoolean()
  isMultiChoice: boolean

  @IsNotEmpty()
  @IsNumber()
  marks: number
  
  @ValidateIf(o => o.isMultiChoice === true)
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(4)
  @Type(() => ChoiceDto)
  choices: ChoiceDto[]
}
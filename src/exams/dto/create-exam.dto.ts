import { Type } from 'class-transformer'
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  ValidateNested
 } from 'class-validator'

export class AnswerDto {
  @IsNotEmpty()
  @IsString()
  text: string
}

export class QuestionDto {
  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  @IsBoolean()
  isMultiChoice: boolean

  @IsNotEmpty()
  @IsNumber()
  marks: number
  
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(4)
  @Type(() => AnswerDto)
  answers: AnswerDto[]
}

export class CreateExamDto {
  @IsNotEmpty()
  @IsNumber()
  lessonID: number

  @IsNotEmpty()
  @IsString()
  title: string

  @IsOptional()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsNumberString()
  startDate: string

  @IsOptional()
  @IsInt()
  maxAttempt: number

  @IsNotEmpty()
  @IsNumberString()
  endDate: string

  // @IsNotEmpty()
  // @IsArray()
  // @ValidateNested({ each: true })
  // @ArrayMinSize(1)
  // @Type(() => QuestionDto)
  // questions: QuestionDto[]
}
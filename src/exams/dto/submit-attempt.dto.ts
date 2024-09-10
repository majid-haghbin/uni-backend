import { Type } from 'class-transformer'
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested
 } from 'class-validator'

export class AnswerDto {
  @IsNotEmpty()
  @IsNumber()
  questionID: number

  @IsNotEmpty()
  @IsBoolean()
  isMultiChoice: boolean

  @IsNotEmpty()
  @IsNumber()
  choiceID: number

  @IsString()
  text: string
}


export class SubmitAttemptDto {
  @IsNotEmpty()
  @IsNumber()
  lessonID: number

  @IsNotEmpty()
  @IsNumber()
  examID: number

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => AnswerDto)
  answers: AnswerDto[]
}
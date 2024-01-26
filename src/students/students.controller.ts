import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common"
import { AuthGuard } from "src/auth/auth.guard"
import { StudentsService } from "./students.service"
import { CreateStudentDTO } from "./dto/create-student.dto"
import { AddToLessonDTO } from "./dto/add-to-lesson.dto"

@Controller('student')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @UseGuards(AuthGuard(['superAdmin']))
  @Post('/create')
  async create(@Body() body: CreateStudentDTO) {

    let response
    if (body.ID === undefined) {
      response = await this.studentsService.create(body)
    } else {
      response = await this.studentsService.update(body)
    }
    return response
  }

  @UseGuards(AuthGuard(['superAdmin', 'admin']))
  @Post('lesson/add')
  async addToLesson(@Body() body: AddToLessonDTO) {

    const response = await this.studentsService.addToLesson(body)
    return response
  }
}
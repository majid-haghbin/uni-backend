import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common"
import { AuthGuard } from "src/auth/auth.guard"
import { StudentsService } from "./students.service"
import { CreateStudentDTO } from "./dto/create-student.dto"
import { AddToLessonDTO } from "./dto/add-to-lesson.dto"
import { RequestWithUser } from "type"
import { ListStudentsDTO } from "../lessons/dto/students-list.dto"
import { LessonsService } from "src/lessons/lessons.service"
import { AppService } from "src/app.service"

@Controller('student')
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly appService: AppService,
    private readonly lessonsService: LessonsService
  ) {}

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

  /**
   * به علت اینکه دیتایی که ادمین در لیست کاربران می‌بیند با دیتایی که اساتید در لیست دانشجویان
   * می‌بینند متفاوت است این وب سرویس جداگانه طراحی شد
   */
  @UseGuards(AuthGuard(['superAdmin', 'admin']))
  @Get('admin/list')
  async studentsForAdmin() {

    const students = await this.studentsService.getStudentsList()
    return this.appService.myResponse({ students })
  }
}
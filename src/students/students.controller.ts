import { Body, Controller, Post, UseGuards } from "@nestjs/common"
import { AuthGuard } from "src/auth/auth.guard"
import { StudentsService } from "./students.service"
import { CreateStudentDTO } from "./dto/create-student.dto"
import { AddToLessonDTO } from "./dto/add-to-lesson.dto"
import { LessonsService } from "src/lessons/lessons.service"
import { AppService } from "src/app.service"
import { StudentsAdminList } from "./dto/admin-list.dto"

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

  @UseGuards(AuthGuard(['superAdmin', 'admin']))
  @Post('lesson/remove')
  async removeFromLesson(@Body() body: AddToLessonDTO) {

    const response = await this.studentsService.removeFromLesson(body)
    return response
  }

  /**
   * به علت اینکه دیتایی که ادمین در لیست کاربران می‌بیند با دیتایی که اساتید در لیست دانشجویان
   * می‌بینند متفاوت است این وب سرویس جداگانه طراحی شد
   */
  @UseGuards(AuthGuard(['superAdmin', 'admin']))
  @Post('admin/list')
  async studentsForAdmin(@Body() body: StudentsAdminList) {
    const students = await this.studentsService.getStudentsList(body)
    return this.appService.myResponse({ students })
  }
}
import { BadRequestException, Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common"
import { AuthGuard } from "src/auth/auth.guard"
import { LessonsService } from "./lessons.service"
import { CreateLessonDTO } from "./dto/create-lesson.dto"
import { RequestWithUser } from "type"

@Controller('lesson')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @UseGuards(AuthGuard(['superAdmin']))
  @Post('/create')
  async create(@Body() body: CreateLessonDTO) {
    if (![1, 2, 3, 4].includes(body.unit)) return new BadRequestException('تعداد واحد درس را درست وارد کنید')

    const lesson = await this.lessonsService.create(body)
    return lesson
  }

  @UseGuards(AuthGuard(['superAdmin', 'admin', 'professor', 'student']))
  @Get('list')
  async list(@Req() request: RequestWithUser) {
    const user = request.user
    let response

    if (user.role === 'professor') {
      response = await this.lessonsService.professorsLessons(user.professorID)
    } else if (user.role === 'student') {
      response = await this.lessonsService.studentsLessons(user.studentID)
    } else {
      response = await this.lessonsService.list()
    }
    return response
  }
}
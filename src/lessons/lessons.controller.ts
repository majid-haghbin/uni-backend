import { BadRequestException, Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common"
import { AuthGuard } from "src/auth/auth.guard"
import { LessonsService } from "./lessons.service"
import { CreateLessonDTO } from "./dto/create-lesson.dto"
import { RequestWithUser } from "type"
import { AppService } from "src/app.service"
import { GetLessonDTO } from "./dto/get-lesson.dto"

@Controller('lesson')
export class LessonsController {
  constructor(
    private readonly lessonsService: LessonsService,
    private readonly appService: AppService
  ) {}

  @UseGuards(AuthGuard(['superAdmin']))
  @Post('/create')
  async create(@Body() body: CreateLessonDTO) {
    if (![1, 2, 3, 4].includes(body.unit)) return new BadRequestException('تعداد واحد درس را درست وارد کنید')

    const lesson = await this.lessonsService.create(body)
    return this.appService.myResponse({ lesson })
  }

  @UseGuards(AuthGuard(['superAdmin', 'admin', 'professor', 'student']))
  @Post('/get')
  async get(@Req() request: RequestWithUser, @Body() body: GetLessonDTO) {
    const { professorID, studentID, role: userRole } = request.user
    let lessonDetails

    if (userRole === 'professor') {
      lessonDetails = await this.lessonsService.getProfessorsLessonDetails(body.lessonID, professorID)
    } else if (userRole === 'student') {
      lessonDetails = await this.lessonsService.getStudentsLesson(body.lessonID, studentID)
    } else {
      lessonDetails = await this.lessonsService.getLessonDetails(body.lessonID)
    }
    return this.appService.myResponse({ ...lessonDetails })
  }

  @UseGuards(AuthGuard(['superAdmin', 'admin', 'professor', 'student']))
  @Get('list')
  async list(@Req() request: RequestWithUser) {
    const user = request.user
    let lessons

    if (user.role === 'professor') {
      lessons = await this.lessonsService.professorsLessons(user.professorID)
    } else if (user.role === 'student') {
      lessons = await this.lessonsService.studentsLessons(user.studentID)
    } else {
      lessons = await this.lessonsService.list()
    }
    return this.appService.myResponse({ lessons })
  }
}
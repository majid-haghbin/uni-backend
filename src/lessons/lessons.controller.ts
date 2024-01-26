import { BadRequestException, Body, Controller, Get, Post, UseGuards } from "@nestjs/common"
import { AuthGuard } from "src/auth/auth.guard"
import { LessonsService } from "./lessons.service"
import { CreateLessonDTO } from "./dto/create-lesson.dto"

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

  @UseGuards(AuthGuard(['superAdmin', 'admin']))
  @Get('list')
  async list() {
    const lessons = await this.lessonsService.list()
    return lessons
  }
}
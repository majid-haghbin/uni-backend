import { BadRequestException, Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common"
import { AuthGuard } from "src/auth/auth.guard"
import { ExamsService } from "./exams.service"
import { RequestWithUser } from "type"
import { ExamListDto } from "./dto/exam-list.dto"

@Controller('exam')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @UseGuards(AuthGuard(['professor']))
  @Post('list')
  async create(@Body() body: ExamListDto, @Req() request: RequestWithUser) {
    const { role: userRole } = request.user

    let response
    if (userRole === 'professor') {
      response = await this.examsService.professorExams(body.lessonID, request.user.professorID)
    }
    return response
  }

}
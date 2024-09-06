import { BadRequestException, Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common"
import { AuthGuard } from "src/auth/auth.guard"
import { ExamsService } from "./exams.service"
import { RequestWithUser } from "type"
import { ExamListDto } from "./dto/exam-list.dto"
import { CreateExamDto } from "./dto/create-exam.dto"
import { CloseExamDto } from "./dto/close-exam.dto"

@Controller('exam')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @UseGuards(AuthGuard(['professor', 'student', 'superAdmin', 'admin']))
  @Post('list')
  async list(@Body() body: ExamListDto, @Req() request: RequestWithUser) {
    const { role: userRole } = request.user

    let response
    if (userRole === 'professor') {
      response = await this.examsService.professorExams(body.lessonID, request.user.professorID)
    } else if (userRole === 'student') {
      response = await this.examsService.studentExams(body.lessonID, request.user.studentID)
    } else {
      response = await this.examsService.examsListForAdmin(body.lessonID)
    }
    return response
  }

  @UseGuards(AuthGuard(['professor', 'superAdmin', 'admin']))
  @Post('create')
  async create(@Body() body: CreateExamDto, @Req() request: RequestWithUser) {
    let exam

    if (request.user.role === 'professor') {
      exam = await this.examsService.createExamByProfessor(body, request.user.professorID)
    } else {
      exam = await this.examsService.createExam(body)
    }
    
    return exam
  }

  @UseGuards(AuthGuard(['professor']))
  @Post('close')
  async close(@Body() body: CloseExamDto, @Req() request: RequestWithUser) {
    const response = await this.examsService.closeExam(body.examID, request.user.professorID)
    return response
  }
}
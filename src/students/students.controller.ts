import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common"
import { AuthGuard } from "src/auth/auth.guard"
import { StudentsService } from "./students.service"
import { CreateStudentDTO } from "./dto/create-student.dto"

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
}
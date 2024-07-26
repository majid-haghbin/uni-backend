import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common"
import { AuthGuard } from "src/auth/auth.guard"
import { ProfessorsService } from "./professors.service"
import { CreateProfessorDTO } from "./dto/create-professor.dto"
import { AppService } from "src/app.service"

@Controller('professor')
export class ProfessorsController {
  constructor(
    private readonly professorsService: ProfessorsService,
    private readonly appService: AppService
  ) {}

  @UseGuards(AuthGuard(['superAdmin']))
  @Post('/create')
  async create(@Body() body: CreateProfessorDTO) {

    let response
    if (body.ID === undefined) {
      response = await this.professorsService.create(body)
    } else {
      response = await this.professorsService.update(body)
    }
    return response
  }

  @UseGuards(AuthGuard(['superAdmin', 'admin']))
  @Get('/list')
  async list() {
    const professors = await this.professorsService.list()
    return this.appService.myResponse({ professors })
  }
}
import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards } from "@nestjs/common"
import { AuthGuard } from "src/auth/auth.guard"
import { ProfessorsService } from "./professors.service"
import { CreateProfessorDTO } from "./dto/create-professor.dto"

@Controller('professor')
export class ProfessorsController {
  constructor(private readonly professorsService: ProfessorsService) {}

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
}
import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards } from "@nestjs/common"
import { MajorsService } from "./majors.service"
import { CreateMajorDTO } from "./dto/major.dto"
import { AuthGuard } from "src/auth/auth.guard"

@Controller('major')
export class MajorsController {
  constructor(private readonly majorsService: MajorsService) {}

  @UseGuards(AuthGuard(['superAdmin']))
  @Post('/create')
  async create(@Body() body: CreateMajorDTO, @Req() req: any) {
    if (req.user.role === 'admin') return new UnauthorizedException()
    
    let response
    if (body.id == undefined) {
      response = await this.majorsService.createMajor(body)
    } else {
      response = await this.majorsService.updateMajor(body)
    }
    return response
  }

  @UseGuards(AuthGuard(['superAdmin']))
  @Get('/list')
  async list() {
    const majors = await this.majorsService.getMajors()
    return majors
  }
}
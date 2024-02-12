import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards } from "@nestjs/common"
import { MajorsService } from "./majors.service"
import { CreateMajorDTO } from "./dto/major.dto"
import { AuthGuard } from "src/auth/auth.guard"
import { AppService } from "src/app.service"
import { MajorDetailsDTO } from "./dto/major-details.dto"

@Controller('major')
export class MajorsController {
  constructor(
    private readonly majorsService: MajorsService,
    private readonly appService: AppService
  ) {}

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
    return this.appService.myResponse({ majors })
  }

  @UseGuards(AuthGuard(['superAdmin', 'admin']))
  @Post('/lessons')
  async majorDetails(@Body() body: MajorDetailsDTO) {
    const major = await this.majorsService.getDetails(body.majorID)
    return this.appService.myResponse({ major })
  }
}
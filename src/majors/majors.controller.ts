import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards } from "@nestjs/common"
import { MajorsService } from "./majors.service"
import { CreateMajorDTO } from "./dto/major.dto"
import { AdminGuard } from "src/auth/admin.guard"

@Controller('major')
export class MajorsController {
  constructor(private readonly majorsService: MajorsService) {}

  @UseGuards(AdminGuard)
  @Post('/create')
  async create(@Body() body: CreateMajorDTO, @Req() req: any) {
    if (req.user.role === 'admin') return new UnauthorizedException()

    const major = await this.majorsService.createMajor({
      name: body.name,
      minimumUnits: body.minimumUnits
    })
    return major
  }

  @UseGuards(AdminGuard)
  @Get('/list')
  async list() {
    const majors = await this.majorsService.getMajors()
    return majors
  }
}
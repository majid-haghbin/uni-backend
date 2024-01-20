import { Controller } from "@nestjs/common"
import { MajorsService } from "./majors.service"

@Controller('major')
export class MajorsController {
  constructor(private readonly majorsService: MajorsService) {}
}
import { Body, Controller, Headers, Post, Res } from "@nestjs/common"
import { CreateAdminDTO } from "src/users/dto/createUser.dto"
import { AdminsService } from "./admins.service"


@Controller('admin')
export class AdminsController {
  constructor(private readonly usersService: AdminsService) {}

  @Post('create')
  async createAdmin(@Body() sanitizedBody: CreateAdminDTO) {
    const result = await this.usersService.createAdmin(sanitizedBody)
    return result
  }
}

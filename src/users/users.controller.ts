import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { AuthGuard } from 'src/auth/auth.guard'
import { RequestWithUser } from 'type'
import { AppService } from 'src/app.service'

@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly appService: AppService
  ) {}

  @UseGuards(AuthGuard(['superAdmin', 'admin']))
  @Post('list')
  async usersList() {
    const users = await this.usersService.usersList()
    return users
  }

  @UseGuards(AuthGuard(['superAdmin', 'admin', 'professor', 'student']))
  @Get('profile')
  async getProfile(@Req() request: RequestWithUser) {
    const { password, adminID, professorID, studentID ,...profile} = request.user

    return this.appService.myResponse({ profile })
  }
}

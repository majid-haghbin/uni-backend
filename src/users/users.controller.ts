import { Controller, Post, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { AuthGuard } from 'src/auth/auth.guard'

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard(['superAdmin', 'admin']))
  @Post('list')
  async usersList() {
    const users = await this.usersService.usersList()
    return users
  }
}

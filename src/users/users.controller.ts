import { Controller, Post, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { AdminGuard } from 'src/auth/admin.guard'

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AdminGuard)
  @Post('list')
  async usersList() {
    const users = await this.usersService.usersList()
    return users
  }
}

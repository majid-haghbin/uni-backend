import { Controller, Post } from '@nestjs/common'
import { UsersService } from './users.service'

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('list')
  async usersList() {
    const users = await this.usersService.usersList()
    return users
  }
}

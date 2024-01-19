import { Controller, Post, Req } from '@nestjs/common'
import { UsersService } from './users.service'

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('list')
  async usersList(@Req() request: any) {
    console.log(request.user)
    const users = await this.usersService.usersList()
    return users
  }
}

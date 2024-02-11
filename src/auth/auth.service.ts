import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { jwtConstants } from './constants'
import { AppService } from 'src/app.service'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private appService: AppService
  ) {}

  async signIn(username: string, password: string): Promise<any> {
    const user = await this.usersService.findUser({
      where: { mobile: username }
    })

    if (user.password !== password) {
      throw new ForbiddenException('نام کاربری یا رمز عبور اشتباه است')
    }

    const payload = { sub: user.ID, username: user.mobile }

    const token = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.secret
    })
    return this.appService.myResponse({ token })
  }
}

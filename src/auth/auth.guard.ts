import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  mixin
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { jwtConstants } from './constants'
import { Request } from 'express'
import { UsersService } from 'src/users/users.service'
import { Role } from 'src/users/dto/users.dto'

export const AuthGuard = (roles: Role[]) => {
  @Injectable()
  class AuthGuardMixin implements CanActivate {
    constructor(
      public jwtService: JwtService,
      public usersService: UsersService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest()
      const token = this.extractTokenFromHeader(request)
      if (!token) {
        throw new UnauthorizedException()
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: jwtConstants.secret
          }
        )
        const user = await this.usersService.findUser({
          where: { mobile: payload.username }
        })

        if (!roles.includes(user.role)) return false

        // 💡 We're assigning the payload to the request object here
        // so that we can access it in our route handlers
        request['user'] = user

      } catch {
        throw new UnauthorizedException()
      }
      return request
    }

    extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? []
      return type === 'Bearer' ? token : undefined
    }
  }

  const guard = mixin(AuthGuardMixin)
  return guard
}
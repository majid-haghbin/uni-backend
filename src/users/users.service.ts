import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { PrismaService } from 'src/database/prisma.service'
import { CreateAdminDTO, Roles } from './dto/createUser.dto'
import { DefaultArgs } from '@prisma/client/runtime/library'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createAdmin(user: CreateAdminDTO) {
    const result = await this.prisma.user.create({
      data: {
        name: user.name,
        family: user.family,
        email:  user.email,
        mobile: user.mobile,
        fatherName: user.fatherName,
        role: Roles[user.role],
        admin: {
          create: {}
        }
      }
    })

    return result
  }

  async findByNumber(mobile: string): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: { mobile }
    })
    return user
  }

  async findUser(payload: Prisma.UserFindUniqueArgs<DefaultArgs>): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique(payload)
    return user
  }

  async usersList() {
    const users = await this.prisma.user.findMany({
      take: 20,
      select: {
        ID: true,
        name: true,
        family: true,
        email: true,
        mobile: true,
        role: true,
        fatherName: true,
      }
    })
    return users
  }
}

import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { PrismaService } from 'src/database/prisma.service'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findOne(id: number): Promise<User | undefined> {
    return this.prisma.user.findUnique({
      where: { id }
    })
  }
}

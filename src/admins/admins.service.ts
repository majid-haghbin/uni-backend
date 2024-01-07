import { Injectable } from '@nestjs/common'
import { Admin } from '@prisma/client'
import { PrismaService } from 'src/database/prisma.service'

@Injectable()
export class AdminsService {
  constructor(private prisma: PrismaService) {}

  findOne(id: number): Promise<Admin | undefined> {
    return this.prisma.admin.findUnique({
      where: { id }
    })
  }
}

import { Injectable } from '@nestjs/common'
import { Professor } from '@prisma/client'
import { PrismaService } from 'src/database/prisma.service'

@Injectable()
export class ProfessorService {
  constructor(private prisma: PrismaService) {}

  findOne(id: number): Promise<Professor | undefined> {
    return this.prisma.professor.findUnique({
      where: { id }
    })
  }
}

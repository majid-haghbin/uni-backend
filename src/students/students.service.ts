import { Injectable } from '@nestjs/common'
import { Student } from '@prisma/client'
import { PrismaService } from 'src/database/prisma.service'

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  findOne(id: number): Promise<Student | undefined> {
    return this.prisma.student.findUnique({
      where: { id }
    })
  }
}

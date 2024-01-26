import { Injectable } from '@nestjs/common'
import { Professor, Prisma } from '@prisma/client'
import { PrismaService } from 'src/database/prisma.service'
import { CreateProfessorDTO } from './dto/create-professor.dto'

@Injectable()
export class ProfessorsService {
  constructor(private prisma: PrismaService) {}

  findOne(id: number): Promise<Professor | undefined> {
    return this.prisma.professor.findUnique({
      where: { id }
    })
  }

  async create(body: CreateProfessorDTO) {
    const createdProfessor = await this.prisma.user.create({
      data: {
        name: body.name.trim(),
        family: body.family.trim(),
        email: body.email.trim(),
        mobile: body.mobile.trim(),
        role: 'professor',
        password: body.password,
        professor: {
          create: {
            dateOfEmployment: body.dateOfEmployment
          }
        }
      },
    })
    return createdProfessor
  }

}

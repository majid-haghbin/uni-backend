import { BadRequestException, Injectable } from '@nestjs/common'
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
        fatherName: body.fatherName.trim(),
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

  async update(body: CreateProfessorDTO) {
    const user = await this.prisma.user.findUnique({
      where: { ID: body.ID }
    })
    if (!user || user.role !== 'professor') return new BadRequestException('آیدی استاد را درست وارد کنید')

    const updatedProfessor = await this.prisma.user.update({
      where: {
        ID: body.ID,
      },
      data: {
        name: body.name.trim(),
        family: body.family.trim(),
        fatherName: body.fatherName.trim(),
        email: body.email.trim(),
        mobile: body.mobile.trim(),
        password: body.password.trim(),
        professor: {
          update: {
            where: {
              user: {
                ID: body.ID
              }
            },
            data: {
              dateOfEmployment: body.dateOfEmployment
            }
          }
        }
      },
    })
    return updatedProfessor
  }

  async list() {
    const professors = await this.prisma.user.findMany({
      where: {
        role: 'professor'
      },
      select: {
        ID: true,
        name: true,
        family: true,
        mobile: true,
        email: true,
      }
    })
    return professors
  }
}

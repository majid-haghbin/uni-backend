import { BadRequestException, Injectable } from '@nestjs/common'
import { Professor, Prisma } from '@prisma/client'
import { PrismaService } from 'src/database/prisma.service'
import { CreateProfessorDTO } from './dto/create-professor.dto'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class ProfessorsService {
  constructor(
    private prisma: PrismaService,
    private userService: UsersService
  ) {}

  findOne(id: number): Promise<Professor | undefined> {
    return this.prisma.professor.findUnique({
      where: { id }
    })
  }

  async create(body: CreateProfessorDTO) {
    const submittedWithSameMobile = await this.userService.findWithMobile(body.mobile)
    if (submittedWithSameMobile) return new BadRequestException('کاربری با این شماره همراه قبلا ثبت شده است')

    const submittedWithSameEmail = await this.userService.findWithEmail(body.email)
    if (submittedWithSameEmail) return new BadRequestException('کاربری با این ایمیل قبلا ثبت شده است')

    const createdProfessor = await this.prisma.user.create({
      data: {
        role: 'professor',
        name: body.name.trim(),
        family: body.family.trim(),
        fatherName: body.fatherName.trim(),
        email: body.email.trim(),
        mobile: body.mobile.trim(),
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

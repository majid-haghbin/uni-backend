import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import { CreateStudentDTO } from './dto/create-student.dto'

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async create(body: CreateStudentDTO) {
    const major = await this.prisma.major.findUnique({
      where: { id: body.majorID }
    })
    if (!major) return new BadRequestException('آیدی رشته تحصیلی اشتباه است')

    const student = await this.prisma.user.create({
      data: {
        name: body.name.trim(),
        family: body.family.trim(),
        fatherName: body.fatherName.trim(),
        email: body.email.trim(),
        mobile: body.mobile,
        role: 'student',
        password: body.password,

        student: {
          create: {
            birthDate: body.birthDate,
            code: body.code,

            major: {
              connect: {
                id: body.majorID,
              }
            }
          }
        }
      }
    })
    return student
  }
}

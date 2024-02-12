import { BadRequestException, HttpException, Injectable } from "@nestjs/common"
import { PrismaService } from "src/database/prisma.service"

@Injectable()
export class MajorsService {
  constructor(private prisma: PrismaService) {}

  async createMajor(body: { name: string, minimumUnits: number }) {
    const major = await this.prisma.major.create({
      data: {
        name: body.name.trim(),
        minimumUnits: body.minimumUnits,
        created: Date.now(),
        updated: Date.now()
      },
    })
    
    return {
      ...major,
      created: Number(major.created),
      updated: Number(major.updated)
    }
  }

  async updateMajor(body: { id: number, name: string, minimumUnits: number }) {
    const { id, ...data } = body

    const retrievedMajor = await this.prisma.major.findUnique({
      where: { id: body.id }
    })
    if (!retrievedMajor) return new BadRequestException('آیدی رشته تحصیلی را درست وارد کنید')
    
    const response = await this.prisma.major.update({
      where: { id },
      data: {
        ...data,
        name: body.name.trim(),
        updated: Date.now()
      }
    })
    return {
      ...response,
      created: Number(response.created),
      updated: Number(response.updated)
    }
  }

  async getMajors() {
    const majors = await this.prisma.major.findMany()
    
    return majors.map(major => {
      return {
        ...major,
        created: Number(major.created),
        updated: Number(major.updated)
      }
    })
  }

  async getDetails(majorID: number) {
    const major = await this.prisma.major.findUnique({
      where: { id: majorID },
      include: {
        lessons: true
      }
    })
    if (!major) return new BadRequestException('آیدی رشته تحصیلی را درست وارد کنید')

    return {
      ...major,
      created: Number(major.created),
      updated: Number(major.updated)
    }
  }
}
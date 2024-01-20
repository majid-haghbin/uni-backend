import { BadRequestException, HttpException, Injectable } from "@nestjs/common"
import { PrismaService } from "src/database/prisma.service"

@Injectable()
export class MajorsService {
  constructor(private prisma: PrismaService) {}

  async createMajor(body: { name: string, minimumUnits: number }) {
    const major = await this.prisma.major.create({
      data: {
        name: body.name,
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

}
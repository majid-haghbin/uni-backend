import { Injectable } from "@nestjs/common"
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
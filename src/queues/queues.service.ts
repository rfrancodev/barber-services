import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import createQueueDto from './dtos/create-queue'

@Injectable()
export class QueuesService {
	constructor(private readonly prisma: PrismaService) {}

	async createQueue(data: createQueueDto) {
		return await this.prisma.queue.create({ data })
	}
	async queueExpertExistToday(expertId: string) {
		return await this.prisma.queue.findFirst({
			where: {
				createdAt: {
					equals: new Date()
				},
				expertId
			}
		})
	}

	async getQueues() {
		return await this.prisma.queue.findMany()
	}

	async getExpertQueues(expertId: string) {
		return await this.prisma.queue.findMany({
			where: {
				expertId
			},
			include: {
				expert: true
			}
		})
	}
}

import {
	BadRequestException,
	Body,
	Controller,
	HttpStatus,
	NotFoundException,
	Post,
	Res
} from '@nestjs/common'
import { QueuesService } from './queues.service'
import CreateExpertsDto from 'src/experts/dtos/create-experts'
import { Response } from 'express'
import { ExpertsService } from 'src/experts/experts.service'
import createQueueDto from './dtos/create-queue'

@Controller('queues')
export class QueuesController {
	constructor(
		private readonly queuesService: QueuesService,
		private readonly expertsService: ExpertsService
	) {}

	@Post()
	async createQueue(@Body() data: createQueueDto, @Res() res: Response) {
		const expert = await this.expertsService.findExpert(data.expertId)

		if (!expert) {
			throw new NotFoundException('O expert não existe')
		}

		const queueExists = await this.queuesService.queueExpertExistToday(
			data.expertId
		)

		if (queueExists) {
			throw new BadRequestException(
				'Já existe uma fila aberta para este profissional'
			)
		}
		const queue = await this.queuesService.createQueue(data)
		return res.status(HttpStatus.CREATED).json(queue)
	}
}

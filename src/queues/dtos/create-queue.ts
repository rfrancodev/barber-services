import { IsNotEmpty } from 'class-validator'

export default class createQueueDto {
	@IsNotEmpty({
		message: 'O campo expertId é obrigatório'
	})
	expertId: string
}

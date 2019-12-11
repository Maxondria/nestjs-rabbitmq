import { Controller, Get } from '@nestjs/common';
import { AppPipe } from './app.pipe';
import { RMQController, RMQRoute, RMQPipe, Validate } from 'nestjs-rmq';
import { MinLength, IsString } from 'class-validator';

export class Message {
	@MinLength(2)
	data: string;

	@IsString()
	test: string;
}

@Controller()
@RMQController()
export class AppController {
	@RMQPipe(AppPipe)
	@RMQRoute('hello')
	@Validate()
	getHello(data: Message): object {
		// throw new Error('Error!'); // - example with error
		return { data: data.data, name: 'Albert' };
	}
}

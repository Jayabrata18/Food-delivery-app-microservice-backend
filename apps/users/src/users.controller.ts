import { Controller, Get, Inject } from '@nestjs/common';
import { UsersMicroserviceService } from './users.service';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from 'libs/common/dtos/create-user.dto';

@Controller()
export class UsersMicroserviceController {
  constructor(
    @Inject('NATS_SERVICE') private natsClient: ClientProxy,
  ) { }
  @MessagePattern({ "cmd": "create_user" })
  createUser(@Payload() data: CreateUserDto) {
    console.log("user_microservice", data);
    return data;


  }
}

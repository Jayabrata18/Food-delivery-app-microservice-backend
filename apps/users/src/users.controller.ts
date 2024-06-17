import { Controller, Get, Inject } from '@nestjs/common';
import { UsersMicroserviceService } from './users.service';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from '@app/common/dtos/create-user.dto';
import { Logger } from '@nestjs/common';
@Controller()
export class UsersMicroserviceController {
  private readonly logger = new Logger(UsersMicroserviceController.name);

  constructor(
    @Inject('NATS_SERVICE') private natsClient: ClientProxy,
  ) { }
  @MessagePattern({ "cmd": "create_user" })
  createUser(@Payload() data: CreateUserDto) {
    this.logger.log("createUser method called with data: " + JSON.stringify(data));
    console.log("user_microservice", data);
    return data;


  }
}

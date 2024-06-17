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
    private userService: UsersMicroserviceService,
  ) { }
  @MessagePattern({ cmd: 'create_user' })
  async createUser(@Payload() data: CreateUserDto) {
    this.logger.log('Received create user request');
    this.logger.debug(`Payload: ${JSON.stringify(data)}`);

    try {
      const user = await this.userService.createUser(data);
      this.logger.log(`User created successfully with userId: ${user.id}`);
      return { message: 'User created successfully', user };
    } catch (error) {
      this.logger.error('Error creating user', error.stack);
      throw error;
    }
  }
}

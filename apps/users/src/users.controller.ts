import { Controller, Get, Inject, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersMicroserviceService } from './users.service';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from '@app/common/dtos/create-user.dto';
import { Logger } from '@nestjs/common';
import { LoginUserDto } from '@app/common';
import { User } from '@app/common/entity';
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
  @MessagePattern({ cmd: 'login_user' })
  async loginUser(@Payload() data: LoginUserDto): Promise<{}> {
    this.logger.log('Received login user request');
    this.logger.debug(`Payload: ${JSON.stringify(data)}`);
    try {
      const user = await this.userService.loginUser(data);
      this.logger.log(`User login successfully with userId: ${user.id}`);
      return { message: 'User login successfully', user };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof UnauthorizedException) {
        throw error;
      } else {
        this.logger.error('Error login user', error.stack);
        throw error;
      }
    }
  }
}
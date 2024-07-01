import {
  Controller,
  Get,
  Inject,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersMicroserviceService } from './users.service';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from '@app/common';
import { UpdateUserDto } from '@app/common/dtos/users/update-user.dto';
@Controller()
export class UsersMicroserviceController {
  private readonly logger = new Logger(UsersMicroserviceController.name);

  constructor(
    @Inject('NATS_SERVICE') private natsClient: ClientProxy,
    private userService: UsersMicroserviceService,
  ) { }
  //create user
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
  //login user
  @MessagePattern({ cmd: 'login_user' })
  async loginUser(@Payload() data: LoginUserDto): Promise<{}> {
    this.logger.log('Received login user request');
    this.logger.debug(`Payload: ${JSON.stringify(data)}`);
    try {
      const user = await this.userService.loginUser(data);
      this.logger.log(`User login successfully with userId: ${user.id}`);
      return { message: 'User login successfully', user };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof UnauthorizedException
      ) {
        throw error;
      } else {
        this.logger.error('Error login user', error.stack);
        throw error;
      }
    }
  }
  //get all users
  @MessagePattern({ cmd: 'get_all_users' })
  async getAllUsers() {
    this.logger.log('Received get all users request');
    try {
      const { users, count } = await this.userService.getAllUsers();
      this.logger.log(`Users fetched successfully`);
      return { message: 'Users fetched successfully', users, count };
    } catch (error) {
      this.logger.error('Error fetching users', error.stack);
      throw error;
    }
  }
  //get user by id
  @MessagePattern({ cmd: 'get_user_by_id' })
  async getUserById(@Payload() data: { userId: string }) {
    this.logger.log('Received get user by id request');
    this.logger.debug(`Payload: ${JSON.stringify(data)}`);
    try {
      const user = await this.userService.getUserById(data.userId);
      this.logger.log(`User fetched successfully with userId: ${user.userId}`);
      return { message: `User fetched successfully with userId: ${user.userId}`, user };
    } catch (error) {
      this.logger.error('Error fetching user', error.stack);
      throw error;
    }
  }
  //get user by email
  @MessagePattern({ cmd: 'get_user_by_email' })
  async getUserByEmail(@Payload() data: { email: string }) {
    this.logger.log('Received get user by email request');
    this.logger.debug(`Payload: ${JSON.stringify(data)}`);
    try {
      const user = await this.userService.getUserByEmail(data.email);
      this.logger.log(`User fetched successfully with email: ${user.email}`);
      return { message: `User fetched successfully with email: ${user.email}`, user };
    } catch (error) {
      this.logger.error('Error fetching user', error.stack);
      throw error;
    }
  }
  //delete user by id
  @MessagePattern({ cmd: 'delete_user_by_id' })
  async deleteUserById(@Payload() data: { userId: string }) {
    this.logger.log('Received delete user by id request');
    this.logger.debug(`Payload: ${JSON.stringify(data)}`);
    try {
      const user = await this.userService.deleteUserById(data.userId);
      this.logger.log(`User deleted successfully with userId: ${user.userId}`);
      return { message: `User deleted successfully with userId: ${user.userId}`, user };
    } catch (error) {
      this.logger.error('Error deleting user', error.stack);
      throw error;
    }
  }
  //update user by id
  @MessagePattern({ cmd: 'update_user_by_id' })
  async updateUserById(@Payload() data: { userId: string, updateUserDto: UpdateUserDto }) {
    this.logger.log('Received update user by id request');
    this.logger.debug(`Payload: ${JSON.stringify(data)}`);
    try {
      const user = await this.userService.updateUserById(data.userId, data.updateUserDto);
      this.logger.log(`User updated successfully with userId: ${user.userId}`);
      return { message: `User updated successfully with userId: ${user.userId}`, user };
    } catch (error) {
      this.logger.error('Error updating user', error.stack);
      throw error;
    }
  }

}

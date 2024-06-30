import { UpdateUserDto } from '@app/common/dtos/users/update-user.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
  Param,
  Put,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('admin')
export class AdminController {
  private readonly logger = new Logger(AdminController.name);
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  //----------------------User Management----------------------

  //get all users
  @Get('/users')
  getAllUsers() {
    this.logger.log('getAllUsers method called');
    return this.natsClient.send({ cmd: 'get_all_users' }, {});
  }
  //get user by id
  @Get('/users/:userId')
  getUserById(@Param('userId') userId: string) {
    console.log('api-gatweway', userId);
    this.logger.log('✅getUserById method called with userId: ' + userId);
    return this.natsClient.send({ cmd: 'get_user_by_id' }, { userId });
  }
  //delete user by id
  @Delete('/users/:userId')
  deleteUserById(@Param('userId') userId: string) {
    console.log('api-gatweway', userId);
    this.logger.log('✅deleteUserById method called with userId: ' + userId);
    return this.natsClient.send({ cmd: 'delete_user_by_id' }, { userId });
  }
  //update user by id (role only)
  @Put('/users/:userId')
  updateUserById(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    console.log('api-gatweway', userId, updateUserDto);
    this.logger.log('✅updateUserById method called with userId: ' + userId);
    return this.natsClient.send(
      { cmd: 'update_user_by_id' },
      { userId, updateUserDto },
    );
  }
}

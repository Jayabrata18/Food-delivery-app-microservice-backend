import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { NatsClientModule } from 'libs/common/nats-client/nats-client.module';

@Module({
  imports: [NatsClientModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

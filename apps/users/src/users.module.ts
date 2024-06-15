import { Module } from '@nestjs/common';
import { NatsClientModule } from 'libs/common/nats-client/nats-client.module';
import { UsersMicroserviceController } from './users.controller';
import { UsersMicroserviceService } from './users.service';

@Module({
  imports: [NatsClientModule],
  controllers: [UsersMicroserviceController],
  providers: [UsersMicroserviceService],
})
export class UsersModule {}

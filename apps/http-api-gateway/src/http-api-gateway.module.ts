import { Module } from '@nestjs/common';
import { NatsClientModule } from 'libs/common/nats-client/nats-client.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [NatsClientModule, UsersModule],
  controllers: [],
  providers: [],
})
export class HttpApiGatewayModule {}

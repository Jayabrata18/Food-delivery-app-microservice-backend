import { Module } from '@nestjs/common';
import { HttpApiGatewayController } from './http-api-gateway.controller';
import { HttpApiGatewayService } from './http-api-gateway.service';
import { NatsClientModule } from 'libs/common/nats-client/nats-client.module';

@Module({
  imports: [NatsClientModule],
  controllers: [HttpApiGatewayController],
  providers: [HttpApiGatewayService],
})
export class HttpApiGatewayModule {}

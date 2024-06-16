import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { NatsClientModule } from '@app/common/nats-client/nats-client.module';

@Module({
  imports: [NatsClientModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule { }

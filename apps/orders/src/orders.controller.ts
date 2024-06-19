import { Controller, Get, Inject, Logger } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class OrdersController {
  private readonly logger = new Logger(OrdersController.name);
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy, private readonly ordersService: OrdersService) { }




}

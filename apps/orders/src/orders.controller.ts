import { Controller, Get, Inject, Logger } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateOrderggDto } from '@app/common/dtos/ordergg.dto';

@Controller()
export class OrdersController {
  private readonly logger = new Logger(OrdersController.name);
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy, private readonly ordersService: OrdersService) {}

  @MessagePattern({ cmd: 'create_order' })
  async createOrder(@Payload() data: CreateOrderggDto) {
    this.logger.log('Received create order request');
    this.logger.debug(`Payload: ${JSON.stringify(data)}`);
    try {
      const order = await this.ordersService.createOrder(data);
      this.logger.log(`Order created successfully with orderId: ${order.id}`);
      return { message: 'Order created successfully', order };
    } catch (error) {
      this.logger.error('Error creating order', error.stack);
      throw error;
    }
  }

 
}

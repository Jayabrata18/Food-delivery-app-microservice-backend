import { CreateOrderggDto } from '@app/common/dtos/ordergg.dto';
import { Ordergg } from '@app/common/entity/orders/ordergg.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
 constructor(
  @InjectRepository(Ordergg)
  private readonly orderRepository: Repository<Ordergg>,
 ) {}
 createOrder(createOrderDto: CreateOrderggDto){
  const newOrder = this.orderRepository.create(createOrderDto);
  return this.orderRepository.save(newOrder);
 }
}

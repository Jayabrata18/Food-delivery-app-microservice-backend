import { Controller, Get } from '@nestjs/common';
import { DeliveryPartnersService } from './delivery-partners.service';

@Controller()
export class DeliveryPartnersController {
  constructor(private readonly deliveryPartnersService: DeliveryPartnersService) {}

  @Get()
  getHello(): string {
    return this.deliveryPartnersService.getHello();
  }
}

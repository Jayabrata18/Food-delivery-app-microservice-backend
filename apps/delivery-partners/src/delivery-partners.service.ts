import { Injectable } from '@nestjs/common';

@Injectable()
export class DeliveryPartnersService {
  getHello(): string {
    return 'Hello World!';
  }
}

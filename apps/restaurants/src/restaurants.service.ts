import { Injectable } from '@nestjs/common';

@Injectable()
export class RestaurantsService {
  getHello(): string {
    return 'Hello World!';
  }
}

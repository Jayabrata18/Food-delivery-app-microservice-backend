import { Injectable } from '@nestjs/common';

@Injectable()
export class HttpApiGatewayService {
  getHello(): string {
    return 'Hello World!';
  }
}

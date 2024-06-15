import { Controller, Get } from '@nestjs/common';
import { HttpApiGatewayService } from './http-api-gateway.service';

@Controller()
export class HttpApiGatewayController {
  constructor(private readonly httpApiGatewayService: HttpApiGatewayService) {}

  @Get()
  getHello(): string {
    return this.httpApiGatewayService.getHello();
  }
}

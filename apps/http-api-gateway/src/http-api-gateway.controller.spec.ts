import { Test, TestingModule } from '@nestjs/testing';
import { HttpApiGatewayController } from './http-api-gateway.controller';
import { HttpApiGatewayService } from './http-api-gateway.service';

describe('HttpApiGatewayController', () => {
  let httpApiGatewayController: HttpApiGatewayController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HttpApiGatewayController],
      providers: [HttpApiGatewayService],
    }).compile();

    httpApiGatewayController = app.get<HttpApiGatewayController>(HttpApiGatewayController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(httpApiGatewayController.getHello()).toBe('Hello World!');
    });
  });
});

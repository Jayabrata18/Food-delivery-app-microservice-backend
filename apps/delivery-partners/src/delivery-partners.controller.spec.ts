import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryPartnersController } from './delivery-partners.controller';
import { DeliveryPartnersService } from './delivery-partners.service';

describe('DeliveryPartnersController', () => {
  let deliveryPartnersController: DeliveryPartnersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DeliveryPartnersController],
      providers: [DeliveryPartnersService],
    }).compile();

    deliveryPartnersController = app.get<DeliveryPartnersController>(DeliveryPartnersController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(deliveryPartnersController.getHello()).toBe('Hello World!');
    });
  });
});

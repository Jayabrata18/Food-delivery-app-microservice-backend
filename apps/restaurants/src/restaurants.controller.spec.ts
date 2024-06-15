import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';

describe('RestaurantsController', () => {
  let restaurantsController: RestaurantsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantsController],
      providers: [RestaurantsService],
    }).compile();

    restaurantsController = app.get<RestaurantsController>(RestaurantsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(restaurantsController.getHello()).toBe('Hello World!');
    });
  });
});

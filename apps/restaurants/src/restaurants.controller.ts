import { Controller, Get, Inject, Logger } from '@nestjs/common';
import { RestaurantsMicroserviceService } from './restaurants.service';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { CreateRestaurantDto } from '@app/common/dtos/create-restaurant.dto';

@Controller()
export class RestaurantsMicroserviceController {
  private readonly logger = new Logger(RestaurantsMicroserviceController.name);
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy, private readonly restaurantsService: RestaurantsMicroserviceService) {}

  @MessagePattern({ cmd: 'create_restaurant' })
  async createRestaurant(data: CreateRestaurantDto) {
    this.logger.log('Received create restaurant request');
    this.logger.debug(`Payload: ${JSON.stringify(data)}`);
    try {
      const restaurant = await this.restaurantsService.createRestaurant(data);
      this.logger.log(`Restaurant created successfully with restaurantId: ${restaurant.id}`);
      return { message: 'Restaurant created successfully', restaurant };
    } catch (error) {
      this.logger.error('Error creating restaurant', error.stack);
      throw error;
    }
  }

  
}

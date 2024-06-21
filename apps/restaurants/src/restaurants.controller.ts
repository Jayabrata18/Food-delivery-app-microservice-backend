import { Controller, Get, Inject, Logger } from '@nestjs/common';
import { RestaurantsMicroserviceService } from './restaurants.service';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateRestaurantDto } from '@app/common/dtos/create-restaurant.dto';
import { CreateMenuItemDto } from '@app/common/dtos/menuItems.dto';

@Controller()
export class RestaurantsMicroserviceController {
  private readonly logger = new Logger(RestaurantsMicroserviceController.name);
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy, private readonly restaurantsService: RestaurantsMicroserviceService) {}

  //create-restaurant
  @MessagePattern({ cmd: 'create_restaurant' })
  async createRestaurant(@Payload() data: CreateRestaurantDto) {
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
  //get-all-restaurants
  @MessagePattern({ cmd: 'get_all_restaurants' })
  async getAllRestaurants() {
    this.logger.log('Received get all restaurants request');
    try {
      const restaurants = await this.restaurantsService.getAllRestaurants();
      return { message: 'All restaurants fetched successfully', restaurants };
    } catch (error) {
      this.logger.error('Error fetching all restaurants', error.stack);
      throw error;
    }
  }
  //add-items
  @MessagePattern({ cmd: 'add_items' })
  async createRestaurantMenuItems(@Payload() data: CreateMenuItemDto) {
    this.logger.log('Received create restaurant menu items request');
    this.logger.debug(`Payload: ${JSON.stringify(data)}`);
    try {
      const menuItem = await this.restaurantsService.createRestaurantMenuItems(data);
      this.logger.log(`Menu item created successfully with menuItemId: ${menuItem.id}`);
      return { message: 'Menu item created successfully', menuItem };
    } catch (error) {
      this.logger.error('Error creating menu item', error.stack);
      throw error;
    }
  }
  //get-restaurant-menu-items
  @MessagePattern({ cmd: 'get_restaurant_menu_items' })
  async getRestaurantMenuItems(@Payload() data: { restaurantId: string }) {
    this.logger.log('Received get restaurant menu items request');
    this.logger.debug(`Payload: ${JSON.stringify(data)}`);
    try {
      const menuItems = await this.restaurantsService.getRestaurantMenuItems(data.restaurantId);
      return { message: 'Menu items fetched successfully', menuItems };
    } catch (error) {
      this.logger.error('Error fetching menu items', error.stack);
      throw error;
    }
  }

  
}

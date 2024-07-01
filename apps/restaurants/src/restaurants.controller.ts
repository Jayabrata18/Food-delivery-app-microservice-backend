import { Controller, Get, Inject, Logger } from '@nestjs/common';
import { RestaurantsMicroserviceService } from './restaurants.service';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateRestaurantDto } from '@app/common/dtos/restaurants/create-restaurant.dto';
import { CreateMenuItemDto } from '@app/common/dtos/restaurants/menu/menuItems.dto';
import { UpdateMenuItemDto } from '@app/common';

@Controller()
export class RestaurantsMicroserviceController {
  private readonly logger = new Logger(RestaurantsMicroserviceController.name);
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy, private readonly restaurantsService: RestaurantsMicroserviceService) { }

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
      const {restaurants, count} = await this.restaurantsService.getAllRestaurants();
      return { message: 'All restaurants fetched successfully', restaurants, count };
    } catch (error) {
      this.logger.error('Error fetching all restaurants', error.stack);
      throw error;
    }
  }
  //get-restaurant-by-id
  @MessagePattern({ cmd: 'get_restaurant_by_id' })
  async getRestaurantById(@Payload() data: { restaurantId: string }) {
    this.logger.log('Received get restaurant by id request');
    this.logger.debug(`Payload: ${JSON.stringify(data)}`);
    try {
      const restaurant = await this.restaurantsService.getRestaurantById(data.restaurantId);
      return { message: 'Restaurant fetched successfully', restaurant };
    } catch (error) {
      this.logger.error('Error fetching restaurant', error.stack);
      throw error;
    }
  }
  //update-restaurant-by-id
  @MessagePattern({ cmd: 'update_restaurant_by_id' })
  async updateRestaurantById(@Payload() data: { restaurantId: string, updateRestaurantDto: CreateRestaurantDto }) {
    this.logger.log('Received update restaurant by id request');
    this.logger.debug(`Payload: ${JSON.stringify(data)}`);
    try {
      const restaurant = await this.restaurantsService.updateRestaurantById(data.restaurantId, data.updateRestaurantDto);
      return { message: 'Restaurant updated successfully', restaurant };
    } catch (error) {
      this.logger.error('Error updating restaurant', error.stack);
      throw error;
    }
  }
  //delete-restaurant-by-id
  @MessagePattern({ cmd: 'delete_restaurant_by_id' })
  async deleteRestaurantById(@Payload() data: { restaurantId: string }) {
    this.logger.log('Received delete restaurant by id request');
    this.logger.debug(`Payload: ${JSON.stringify(data)}`);
    try {
      const restaurant = await this.restaurantsService.deleteRestaurantById(data.restaurantId);
      return { message: 'Restaurant deleted successfully', restaurant };
    } catch (error) {
      this.logger.error('Error deleting restaurant', error.stack);
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
      return { message: `Menu items fetched successfully for this restaurantId ${data.restaurantId}`, menuItems };
    } catch (error) {
      this.logger.error('Error fetching menu items', error.stack);
      throw error;
    }
  }
  //update-restaurant-menu-items
  @MessagePattern({ cmd: 'update_restaurant_menu_items' })
  async updateRestaurantMenuItems(@Payload() data: { restaurantId: string, menuItemDto: UpdateMenuItemDto }) {
    this.logger.log('Received update restaurant menu items request');
    this.logger.debug(`Payload: ${JSON.stringify(data)}`);
    try {
      const menuItem = await this.restaurantsService.updateRestaurantMenuItems(data.restaurantId, data.menuItemDto);
      this.logger.log(`Menu item updated successfully with menuItemId: ${menuItem.id}`);
      return { message: 'Menu item updated successfully', menuItem };
    } catch (error) {
      this.logger.error('Error updating menu item', error.stack);
      throw error;
    }
  }
  //find restaurants-controllers

  //find restaurants by pincode
  @MessagePattern({ cmd: 'find_restaurants_by_pincode' })
  async findRestaurantsByPincode(@Payload() data: { pincode: number }) {
    this.logger.log('Received find restaurants by pincode request');
    this.logger.debug(`Payload: ${JSON.stringify(data)}`);
    try {
      const restaurants = await this.restaurantsService.findRestaurantsByPincode(data.pincode);
      return { message: 'Restaurants fetched successfully', restaurants };
    } catch (error) {
      this.logger.error('Error fetching restaurants', error.stack);
      throw error;
    }
  }
  //find restaurants by name
  @MessagePattern({ cmd: 'find_restaurants_by_name' })
  async findRestaurantsByName(@Payload() data: { name: string }) {
    this.logger.log('Received find restaurants by name request');
    this.logger.debug(`Payload: ${JSON.stringify(data)}`);
    try {
      const restaurants = await this.restaurantsService.findRestaurantsByName(data.name);
      return { message: 'Restaurants fetched successfully', restaurants };
    } catch (error) {
      this.logger.error('Error fetching restaurants', error.stack);
      throw error;
    }
  }
  //find restaurants by menuItem
  @MessagePattern({ cmd: 'find_restaurants_by_menu_item' })
  async findRestaurantsByMenuItem(@Payload() data: { menuItem: string }) {
    this.logger.log('Received find restaurants by menuItem request');
    this.logger.debug(`Payload: ${JSON.stringify(data)}`);
    try {
      const restaurants = await this.restaurantsService.findRestaurantsByMenuItem(data.menuItem);
      return { message: 'Restaurants fetched successfully', restaurants };
    } catch (error) {
      this.logger.error('Error fetching restaurants', error.stack);
      throw error;
    }
  }



}

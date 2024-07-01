import { Controller, Get, Inject, Logger } from '@nestjs/common';
import { RestaurantsMicroserviceService } from './restaurants.service';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateRestaurantDto } from '@app/common/dtos/restaurants/create-restaurant.dto';
import { CreateMenuItemDto } from '@app/common/dtos/restaurants/menu/menuItems.dto';
import { UpdateMenuItemDto } from '@app/common';

@Controller()
export class RestaurantsMicroserviceController {
  private readonly logger = new Logger(RestaurantsMicroserviceController.name);
  constructor(
    @Inject('NATS_SERVICE') private natsClient: ClientProxy,
    private readonly restaurantsService: RestaurantsMicroserviceService,
  ) { }
  //----admin rlated----
  //create-restaurant
  @MessagePattern({ cmd: 'create_restaurant' })
  async createRestaurant(@Payload() data: CreateRestaurantDto) {
    this.logger.log('Received create restaurant request');
    this.logger.debug(`Payload: ${JSON.stringify(data)}`);
    try {
      const restaurant = await this.restaurantsService.createRestaurant(data);
      this.logger.log(
        `Restaurant created successfully with restaurantId: ${restaurant.id}`,
      );
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
      const { restaurants, count } =
        await this.restaurantsService.getAllRestaurants();
      return {
        message: 'All restaurants fetched successfully',
        restaurants,
        count,
      };
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
      const restaurant = await this.restaurantsService.getRestaurantById(
        data.restaurantId,
      );
      return { message: 'Restaurant fetched successfully', restaurant };
    } catch (error) {
      this.logger.error('Error fetching restaurant', error.stack);
      throw error;
    }
  }
  //update-restaurant-by-id
  @MessagePattern({ cmd: 'update_restaurant_by_id' })
  async updateRestaurantById(
    @Payload()
    data: {
      restaurantId: string;
      updateRestaurantDto: CreateRestaurantDto;
    },
  ) {
    this.logger.log('Received update restaurant by id request');
    this.logger.debug(`Payload: ${JSON.stringify(data)}`);
    try {
      const restaurant = await this.restaurantsService.updateRestaurantById(
        data.restaurantId,
        data.updateRestaurantDto,
      );
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
      const restaurant = await this.restaurantsService.deleteRestaurantById(
        data.restaurantId,
      );
      return { message: 'Restaurant deleted successfully', restaurant };
    } catch (error) {
      this.logger.error('Error deleting restaurant', error.stack);
      throw error;
    }
  }
  //-----restaurant related------
  //add-items
  @MessagePattern({ cmd: 'add_items' })
  async createRestaurantMenuItems(@Payload() data: CreateMenuItemDto) {
    this.logger.log('Received create restaurant menu items request');
    this.logger.debug(`Payload: ${JSON.stringify(data)}`);
    try {
      const menuItem =
        await this.restaurantsService.createRestaurantMenuItems(data);
      this.logger.log(
        `Menu item created successfully with menuItemId: ${menuItem.id}`,
      );
      return { message: 'Menu item created successfully', menuItem };
    } catch (error) {
      this.logger.error('Error creating menu item', error.stack);
      throw error;
    }
  }

  //update-restaurant-menu-items
  @MessagePattern({ cmd: 'update_restaurant_menu_items' })
  async updateRestaurantMenuItems(
    @Payload() data: { restaurantId: string; menuItemDto: UpdateMenuItemDto },
  ) {
    this.logger.log('Received update restaurant menu items request');
    this.logger.debug(`Payload: ${JSON.stringify(data)}`);
    try {
      const menuItem = await this.restaurantsService.updateRestaurantMenuItems(
        data.restaurantId,
        data.menuItemDto,
      );
      this.logger.log(
        `Menu item updated successfully with menuItemId: ${menuItem.id}`,
      );
      return { message: 'Menu item updated successfully', menuItem };
    } catch (error) {
      this.logger.error('Error updating menu item', error.stack);
      throw error;
    }
  }
  //update-menu-item-price
  @MessagePattern({ cmd: 'update_price_of_menu' })
  async updateRestaurantMenuItemPrice(
    @Payload()
    data: {
      restaurantId: string;
      menuItemId: string;
      price: number;
    },
  ) {
    this.logger.log('Received update menu item price request');
    this.logger.debug(`Payload: ${JSON.stringify(data)}`);
    try {
      const menuItem =
        await this.restaurantsService.updateRestaurantMenuItemPrice(
          data.restaurantId,
          data.menuItemId,
          data.price,
        );
      this.logger.log(
        `Menu item price updated successfully with menuItemId: ${menuItem.id}`,
      );
      return { message: 'Menu item price updated successfully', menuItem };
    } catch (error) {
      this.logger.error('Error updating menu item price', error.stack);
      throw error;
    }
  }
  //delete-menu-item
  @MessagePattern({ cmd: 'delete_menu_item' })
  async deleteRestaurantMenuItem(
    @Payload() data: { restaurantId: string; menuItemId: string },
  ) {
    this.logger.log('Received delete menu item request');
    this.logger.debug(`Payload: ${JSON.stringify(data)}`);
    try {
      const menuItem = await this.restaurantsService.deleteRestaurantMenuItem(
        data.restaurantId,
        data.menuItemId,
      );
      return { message: 'Menu item deleted successfully', menuItem };
    } catch (error) {
      this.logger.error('Error deleting menu item', error.stack);
      throw error;
    }
  }
  //update status of menu item (isAvailable or notAvailable)
  @MessagePattern({ cmd: 'update_menu_item_status' })
  async updateRestaurantMenuItemStatus(
    @Payload()
    data: {
      restaurantId: string;
      menuItemId: string;
      status: boolean;
    },
  ) {
    this.logger.log('Received update menu item status request');
    this.logger.debug(`Payload: ${JSON.stringify(data)}`);
    try {
      const menuItem =
        await this.restaurantsService.updateRestaurantMenuItemStatus(
          data.restaurantId,
          data.menuItemId,
          data.status,
        );
      return { message: 'Menu item status updated successfully', menuItem };
    } catch (error) {
      this.logger.error('Error updating menu item status', error.stack);
      throw error;
    }
  }
  //find restaurants-controllers
  //------user related------

  //find restaurants by pincode
  @MessagePattern({ cmd: 'find_restaurants_by_pincode' })
  async findRestaurantsByPincode(@Payload() data: { pincode: number }) {
    this.logger.log('Received find restaurants by pincode request');
    this.logger.debug(`Payload: ${JSON.stringify(data)}`);
    try {
      const restaurants =
        await this.restaurantsService.findRestaurantsByPincode(data.pincode);
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
      const restaurants = await this.restaurantsService.findRestaurantsByName(
        data.name,
      );
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
      const restaurants =
        await this.restaurantsService.findRestaurantsByMenuItem(data.menuItem);
      return { message: 'Restaurants fetched successfully', restaurants };
    } catch (error) {
      this.logger.error('Error fetching restaurants', error.stack);
      throw error;
    }
  }

  //get-restaurant-all-menu-items
  @MessagePattern({ cmd: 'get_restaurant_menu_items' })
  async getRestaurantMenuItems(@Payload() data: { restaurantId: string }) {
    this.logger.log('Received get restaurant menu items request');
    this.logger.debug(`Payload: ${JSON.stringify(data)}`);
    try {
      const menuItems = await this.restaurantsService.getRestaurantMenuItems(
        data.restaurantId,
      );
      return {
        message: `Menu items fetched successfully for this restaurantId ${data.restaurantId}`,
        menuItems,
      };
    } catch (error) {
      this.logger.error('Error fetching menu items', error.stack);
      throw error;
    }
  }
  //get details of a specific menu item
  @MessagePattern({ cmd: 'get_menu_item' })
  async getRestaurantMenuItem(
    @Payload() data: { restaurantId: string; menuItemId: string },
  ) {
    this.logger.log('Received get restaurant menu item request');
    this.logger.debug(`Payload: ${JSON.stringify(data)}`);
    try {
      const menuItem = await this.restaurantsService.getRestaurantMenuItem(
        data.restaurantId,
        data.menuItemId,
      );
      return { message: 'Menu item fetched successfully', menuItem };
    } catch (error) {
      this.logger.error('Error fetching menu item', error.stack);
      throw error;
    }
  }
  //---------Order related---------

  //get all orders by a restaurant
  @MessagePattern({ cmd: 'get_restaurant_orders' })
  async getAllOrdersByRestaurant(@Payload() data: { restaurantId: string }) {
    this.logger.log('Received get restaurant orders request');
    this.logger.debug(`Payload: ${JSON.stringify(data)}`);
    try {
      const orders = await this.restaurantsService.getAllOrdersByRestaurant(
        data.restaurantId,
      );
      return { message: 'Orders fetched successfully', orders };
    } catch (error) {
      this.logger.error('Error fetching orders', error.stack);
      throw error;
    }
  }
  //get order by orderId
  @MessagePattern({ cmd: 'get_restaurant_order_by_id' })
  async getRestaurantOrderById(@Payload() data: { orderId: string, restaurantId: string }) {
    this.logger.log('Received get order by orderId request');
    this.logger.debug(`Payload: ${JSON.stringify(data)}`);
    try {
      const order = await this.restaurantsService.getRestaurantOrderById(
        data.orderId,
        data.restaurantId,
      );
      return { message: 'Order fetched successfully', order };
    } catch (error) {
      this.logger.error('Error fetching order', error.stack);
      throw error;
    }
  }
  //update order status
  @MessagePattern({ cmd: 'update_order_status' })
  async updateOrderStatus(
    @Payload()
    data: {
      restaurantId: string;
      orderId: string;
      status: string;
    },
  ) {
    this.logger.log('Received update order status request');
    this.logger.debug(`Payload: ${JSON.stringify(data)}`);
    try {
      const order = await this.restaurantsService.updateOrderStatus(
        data.restaurantId,
        data.orderId,
        data.status,
      );
      return { message: 'Order status updated successfully', order };
    } catch (error) {
      this.logger.error('Error updating order status', error.stack);
      throw error;
    }
  }

}

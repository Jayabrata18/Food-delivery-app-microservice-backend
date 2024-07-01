import { UpdateMenuItemDto, UpdatePriceOfMenuDto } from '@app/common';
import { UpdateOrderStatusDto } from '@app/common/dtos/orders/order-statuts-update.dto';
import { CreateRestaurantDto } from '@app/common/dtos/restaurants/create-restaurant.dto';
import { CreateMenuItemDto } from '@app/common/dtos/restaurants/menu/menuItems.dto';
import { UpdateMenuItemStatusDto } from '@app/common/dtos/restaurants/menu/update-menu-ittems-status.dto';
import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('restaurants')
export class RestaurantsController {
  private readonly logger = new Logger(RestaurantsController.name);
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  //------------------------------Menu Management ----------------------------------------------------------------

  //create restaurant menu items
  @Post('/:restaurantId/menu')
  createRestaurantMenuItems(
    @Param('restaurantId') restaurantId: string,
    @Body() createMenuItemDto: CreateMenuItemDto,
  ) {
    console.log('api-gatweway', restaurantId, createMenuItemDto);
    this.logger.log(
      '✅createRestaurantMenuItems method called with data: ' +
        JSON.stringify(createMenuItemDto),
    );
    return this.natsClient.send(
      { cmd: 'add_menu_items' },
      { restaurantId, createMenuItemDto },
    );
  }
 
  //get restaurant all menu items
  @Get('/:restaurantId/menu')
  getRestaurantMenuItems(@Param('restaurantId') restaurantId: string) {
    console.log('api-gatweway', restaurantId);
    this.logger.log(
      '✅getRestaurantMenuItems method called with restaurantId: ' +
        restaurantId,
    );
    return this.natsClient.send(
      { cmd: 'get_all_menu_items' },
      { restaurantId },
    );
  }

  //get details of a specific menu item
  @Get('/:restaurantId/menu/:menuItemId')
  getRestaurantMenuItem(
    @Param('restaurantId') restaurantId: string,
    @Param('menuItemId') menuItemId: string,
  ) {
    console.log('api-gatweway', restaurantId, menuItemId);
    this.logger.log(
      '✅getRestaurantMenuItem method called with restaurantId: ' +
        restaurantId +
        ' menuItemId: ' +
        menuItemId,
    );
    return this.natsClient.send(
      { cmd: 'get_menu_item' },
      { restaurantId, menuItemId },
    );
  }
  //udate any menu items
  @Put('/:restaurantId/menu/:menuItemId')
  updateRestaurantMenuItem(
    @Param('restaurantId') restaurantId: string,
    @Param('menuItemId') menuItemId: string,
    @Body() updateMenuItemDto: UpdateMenuItemDto,
  ) {
    console.log('api-gatweway', restaurantId, menuItemId, updateMenuItemDto);
    this.logger.log(
      '✅updateRestaurantMenuItem method called with restaurantId: ' +
        restaurantId +
        ' menuItemId: ' +
        menuItemId,
    );
    return this.natsClient.send(
      { cmd: 'update_menu_item' },
      { restaurantId, menuItemId, updateMenuItemDto },
    );
  }

  //update menu item price
  @Put('/:menuItemId/menu/:menuItemId/price')
  updatePriceOfMenu(
    @Param('restaurantId') restaurantId: string,
    @Param('menuItemId') menuItemId: string,
    @Body() updateMenuItemPriceDto: UpdatePriceOfMenuDto,
  ) {
    console.log(
      'api-gatweway',
      restaurantId,
      menuItemId,
      updateMenuItemPriceDto,
    );
    this.logger.log(
      '✅updatePriceOfMenu method called with restaurantId: ' +
        restaurantId +
        ' menuItemId: ' +
        menuItemId,
    );
    return this.natsClient.send(
      { cmd: 'update_price_of_menu' },
      { restaurantId, menuItemId, updateMenuItemPriceDto },
    );
  }
  //delete menu
  @Delete('/:restaurantId/menu/:menuItemId')
  deleteMenuItem(
    @Param('restaurantId') restaurantId: string,
    @Param('menuItemId') menuItemId: string,
  ) {
    console.log('api-gatweway', restaurantId, menuItemId);
    this.logger.log(
      '✅deleteMenuItem method called with restaurantId: ' +
        restaurantId +
        ' menuItemId: ' +
        menuItemId,
    );
    return this.natsClient.send(
      { cmd: 'delete_menu_item' },
      { restaurantId, menuItemId },
    );
  }
  //update status of menu item (isAvailable or notAvailable)
  @Put('/:restaurantId/menu/:menuItemId/status')
  updateMenuItemStatus(
    @Param('restaurantId') restaurantId: string,
    @Param('menuItemId') menuItemId: string,
    @Body() updateMenuItemStatusDto: UpdateMenuItemStatusDto,
  ) {
    console.log(
      'api-gatweway',
      restaurantId,
      menuItemId,
      updateMenuItemStatusDto,
    );
    this.logger.log(
      '✅updateMenuItemStatus method called with restaurantId: ' +
        restaurantId +
        ' menuItemId: ' +
        menuItemId,
    );
    return this.natsClient.send(
      { cmd: 'update_menu_item_status' },
      { restaurantId, menuItemId, updateMenuItemStatusDto },
    );
  }
  //------------------------------Order Management ----------------------------------------------------------------

  //get all orders by a restaurant
  @Get('/:restaurantId/orders')
  getRestaurantOrders(@Param('restaurantId') restaurantId: string) {
    console.log('api-gatweway', restaurantId);
    this.logger.log(
      '✅getRestaurantOrders method called with restaurantId: ' + restaurantId,
    );
    return this.natsClient.send(
      { cmd: 'get_restaurant_orders' },
      { restaurantId },
    );
  }

  // get a specific order
  @Get('/:restaurantId/orders/:orderId')
  getRestaurantOrder(
    @Param('restaurantId') restaurantId: string,
    @Param('orderId') orderId: string,
  ) {
    console.log('api-gatweway', restaurantId, orderId);
    this.logger.log(
      '✅getRestaurantOrder method called with restaurantId: ' +
        restaurantId +
        ' orderId: ' +
        orderId,
    );
    return this.natsClient.send(
      { cmd: 'get_restaurant_order' },
      { restaurantId, orderId },
    );
  }

  //update order status
  @Put('/:restaurantId/orders/:orderId/status')
  updateOrderStatus(
    @Param('restaurantId') restaurantId: string,
    @Param('orderId') orderId: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    console.log('api-gatweway', restaurantId, orderId, updateOrderStatusDto);
    this.logger.log(
      '✅updateOrderStatus method called with restaurantId: ' +
        restaurantId +
        ' orderId: ' +
        orderId,
    );
    return this.natsClient.send(
      { cmd: 'update_order_status' },
      { restaurantId, orderId, updateOrderStatusDto },
    );
  }

  //------------------------------Analytics Management ----------------------------------------------------------------

  // Retrieve order statistics
  @Get('/:restaurantId/analytics/orders')
  getRestaurantOrderStatistics(@Param('restaurantId') restaurantId: string) {
    console.log('api-gatweway', restaurantId);
    this.logger.log(
      '✅getRestaurantOrderStatistics method called with restaurantId: ' +
        restaurantId,
    );
    return this.natsClient.send(
      { cmd: 'get_restaurant_order_statistics' },
      { restaurantId },
    );
  }
  //Retrieve revenue statistics
  @Get('/:restaurantId/analytics/revenue')
  getRestaurantRevenueStatistics(@Param('restaurantId') restaurantId: string) {
    console.log('api-gatweway', restaurantId);
    this.logger.log(
      '✅getRestaurantRevenueStatistics method called with restaurantId: ' +
        restaurantId,
    );
    return this.natsClient.send(
      { cmd: 'get_restaurant_revenue_statistics' },
      { restaurantId },
    );
  }
}

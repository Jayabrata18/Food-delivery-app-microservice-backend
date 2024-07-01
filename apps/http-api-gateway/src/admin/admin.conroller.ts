import { CreateRestaurantDto } from '@app/common';
import { DeliveryPartnerDto } from '@app/common/dtos/delivery-partners/create-delivery-partners.dto';
import { UpdateUserDto } from '@app/common/dtos/users/update-user.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('admin')
export class AdminController {
  private readonly logger = new Logger(AdminController.name);
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) { }

  //----------------------User Management----------------------

  //get all users
  @Get('/users')
  getAllUsers() {
    this.logger.log('getAllUsers method called');
    return this.natsClient.send({ cmd: 'get_all_users' }, {});
  }
  //get user by id
  @Get('/users/:userId')
  getUserById(@Param('userId') userId: string) {
    console.log('api-gatweway', userId);
    this.logger.log('✅getUserById method called with userId: ' + userId);
    return this.natsClient.send({ cmd: 'get_user_by_id' }, { userId });
  }
  //delete user by id
  @Delete('/users/:userId')
  deleteUserById(@Param('userId') userId: string) {
    console.log('api-gatweway', userId);
    this.logger.log('✅deleteUserById method called with userId: ' + userId);
    return this.natsClient.send({ cmd: 'delete_user_by_id' }, { userId });
  }
  //update user by id (role only)
  @Put('/users/:userId')
  updateUserById(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    console.log('api-gatweway', userId, updateUserDto);
    this.logger.log('✅updateUserById method called with userId: ' + userId);
    return this.natsClient.send(
      { cmd: 'update_user_by_id' },
      { userId, updateUserDto },
    );
  }

  //--------------------Restaurant Management--------------------

  //get all restaurants
  @Get('/get-all-restaurants')
  getAllRestaurants() {
    console.log('api-gatweway');
    this.logger.log('getAllRestaurants method called');
    return this.natsClient.send({ cmd: 'get_all_restaurants' }, {});
  }
  //get restaurant by id
  @Get('/get-restaurant/:restaurantId')
  getRestaurantById(@Param('restaurantId') restaurantId: string) {
    console.log('api-gatweway', restaurantId);
    this.logger.log(
      '✅getRestaurantById method called with restaurantId: ' + restaurantId,
    );
    return this.natsClient.send(
      { cmd: 'get_restaurant_by_id' },
      { restaurantId },
    );
  }
  //create restaurant
  @Post('/create-restaurant')
  createRestaurant(@Body() createRestaurantDto: CreateRestaurantDto) {
    console.log('api-gatweway', createRestaurantDto);
    this.logger.log(
      '✅createRestaurant method called with data: ' +
      JSON.stringify(createRestaurantDto),
    );
    return this.natsClient.send(
      { cmd: 'create_restaurant' },
      createRestaurantDto,
    );
  }
  //update restaurant by id
  @Put('/update-restaurant/:restaurantId')
  updateRestaurantById(
    @Param('restaurantId') restaurantId: string,
    @Body() updateRestaurantDto: CreateRestaurantDto,
  ) {
    console.log('api-gatweway', restaurantId, updateRestaurantDto);
    this.logger.log(
      '✅updateRestaurantById method called with restaurantId: ' + restaurantId,
    );
    return this.natsClient.send(
      { cmd: 'update_restaurant_by_id' },
      { restaurantId, updateRestaurantDto },
    );
  }
  //delete restaurant by id
  @Delete('/delete-restaurant/:restaurantId')
  deleteRestaurantById(@Param('restaurantId') restaurantId: string) {
    console.log('api-gatweway', restaurantId);
    this.logger.log(
      '✅deleteRestaurantById method called with restaurantId: ' + restaurantId,
    );
    return this.natsClient.send(
      { cmd: 'delete_restaurant_by_id' },
      { restaurantId },
    );
  }

  //----------------------Delivery Partner Management----------------------

  //create a delivery partners
  @Post('/create-delivery-partner')
  createDeliveryPartner(@Body() createDeliveryPartnerDto: DeliveryPartnerDto) {
    console.log('api-gatweway', createDeliveryPartnerDto);
    this.logger.log(
      '✅createDeliveryPartner method called with data: ' +
      JSON.stringify(createDeliveryPartnerDto),
    );
    return this.natsClient.send(
      { cmd: 'create_delivery_partner' },
      createDeliveryPartnerDto,
    );
  }

  //get all delivery partners
  @Get('/get-all-delivery-partners')
  getAllDeliveryPartners() {
    console.log('api-gatweway');
    this.logger.log('getAllDeliveryPartners method called');
    return this.natsClient.send({ cmd: 'get_all_delivery_partners' }, {});
  }

  //get delivery partner by id
  @Get('/get-delivery-partner/:deliveryPartnerId')
  getDeliveryPartnerById(
    @Param('deliveryPartnerId') deliveryPartnerId: string,
  ) {
    console.log('api-gatweway', deliveryPartnerId);
    this.logger.log(
      '✅getDeliveryPartnerById method called with deliveryPartnerId: ' +
      deliveryPartnerId,
    );
    return this.natsClient.send(
      { cmd: 'get_delivery_partner_by_id' },
      { deliveryPartnerId },
    );
  }
  //update delivery partner by id
  @Put('/update-delivery-partner/:deliveryPartnerId')
  updateDeliveryPartnerById(
    @Param('deliveryPartnerId') deliveryPartnerId: string,
    @Body() updateDeliveryPartnerDto: DeliveryPartnerDto,
  ) {
    console.log('api-gatweway', updateDeliveryPartnerDto);
    this.logger.log(
      '✅updateDeliveryPartnerById method called with deliveryPartnerId: ' +
      deliveryPartnerId,
    );
    return this.natsClient.send(
      { cmd: 'update_delivery_partner_by_id' },
      { deliveryPartnerId, updateDeliveryPartnerDto },
    );
  }
  //delete delivery partner by id
  @Delete('/delete-delivery-partner/:deliveryPartnerId')
  deleteDeliveryPartnerById(
    @Param('deliveryPartnerId') deliveryPartnerId: string,
  ) {
    console.log('api-gatweway', deliveryPartnerId);
    this.logger.log(
      '✅deleteDeliveryPartnerById method called with deliveryPartnerId: ' +
      deliveryPartnerId,
    );
    return this.natsClient.send(
      { cmd: 'delete_delivery_partner_by_id' },
      { deliveryPartnerId },
    );
  }
}

import {
    Body,
    Controller,
    Get,
    Inject,
    Logger,
    Param,
    Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from '@app/common/dtos/users/create-user.dto';
import { LoginUserDto } from '@app/common';

@Controller('users')
export class UsersController {
    private readonly logger = new Logger(UsersController.name);

    constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) { }
    //create-user
    @Post('/signup')
    createUser(@Body() createUserDto: CreateUserDto) {
        console.log('api-gatweway', createUserDto);
        this.logger.log(
            'createUser method called with data: ' + JSON.stringify(createUserDto),
        );
        return this.natsClient.send({ cmd: 'create_user' }, createUserDto);
    }
    //login-user
    @Post('/login')
    loginUser(@Body() loginUserDto: LoginUserDto) {
        console.log('api-gatweway', loginUserDto);
        this.logger.log(
            'loginUser method called with data: ' + JSON.stringify(loginUserDto),
        );
        return this.natsClient.send({ cmd: 'login_user' }, loginUserDto);
    }

    //--------------------Restaurants Related--------------------------


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


    //find restaurants by pincode
    @Get('/restaurants/:pincode')
    findRestaurantsByPincode(@Param('pincode') pincode: number) {
        this.logger.log('Received find restaurants by pincode request');
        return this.natsClient.send(
            { cmd: 'find_restaurants_by_pincode' },
            { pincode },
        );
    }
    //find restaurants by name
    @Get('/restaurants/:name')
    findRestaurantsByName(@Param('name') name: string) {
        this.logger.log('Received find restaurants by name request');
        return this.natsClient.send(
            { cmd: 'find_restaurants_by_name' },
            { name },
        );
    }
    //find restaurants by menuItem
    @Get('/restaurants/:menuItem')
    findRestaurantsByMenuItem(@Param('menuItem') menuItem: string) {
        this.logger.log('Received find restaurants by menuItem request');
        return this.natsClient.send(
            { cmd: 'find_restaurants_by_menu_item' },
            { menuItem },
        );
    }
    //------------------Orders Related-------------------------
    //create order
    @Post('/orders')
    createOrder(@Body() orderDto: any) {
        this.logger.log('Received create order request');
        return this.natsClient.send({ cmd: 'create_order' }, orderDto);
    }

}

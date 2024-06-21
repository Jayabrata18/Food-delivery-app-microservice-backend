import { CreateRestaurantDto } from "@app/common/dtos/create-restaurant.dto";
import { CreateMenuItemDto } from "@app/common/dtos/menuItems.dto";
import { Body, Controller, Get, Inject, Logger, Param, Post, Put } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";



@Controller('restaurants')
export class RestaurantsController {
    private readonly logger = new Logger(RestaurantsController.name);
    constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) { }
    //create-restaurant
    @Post('/create-restaurant')
    createRestaurant(@Body() createRestaurantDto: CreateRestaurantDto) {
        console.log("api-gatweway", createRestaurantDto);
        this.logger.log("createRestaurant method called with data: " + JSON.stringify(createRestaurantDto));
        return this.natsClient
            .send({ cmd: 'create_restaurant' }, createRestaurantDto)

    }
    //get all restaurants
    @Get('/get-all-restaurants')
    getAllRestaurants() {
        console.log("api-gatweway");
        this.logger.log("getAllRestaurants method called");
        return this.natsClient
            .send({ cmd: 'get_all_restaurants' }, {})
        // .forEach((response) => {
        //     console.log(response);
        //     this.logger.log(response.message);
        //     response.restaurants.forEach((restaurant) => {
        //         console.log(restaurant);
        //         this.logger.log(restaurant.restaurantName);
        //     });
        // })

    }
    //create restaurant menu items
    @Post('/add-items')
    createRestaurantMenuItems(@Body() createMenuItemDto: CreateMenuItemDto) {
        console.log("api-gatweway", createMenuItemDto);
        this.logger.log("createRestaurantMenuItems method called with data: " + JSON.stringify(createMenuItemDto));
        return this.natsClient
            .send({ cmd: 'add_items' }, createMenuItemDto)
    }
    //get restaurant menu items
    @Get('/get-restaurant-menu-items/:restaurantId')
    getRestaurantMenuItems(@Param('restaurantId') restaurantId: string) {
        console.log("api-gatweway", restaurantId);
        this.logger.log("getRestaurantMenuItems method called with restaurantId: " + restaurantId);
        return this.natsClient
            .send({ cmd: 'get_restaurant_menu_items' }, { restaurantId })
        //.forEach((response) => {
        //     console.log(response);
        //     this.logger.log(response.message);
        //     response.menuItems.forEach((menuItem) => {
        //         console.log(menuItem);
        //         this.logger.log(menuItem.menuItemName);
        //     });
        // })
    }
    //update restaurant menu items
    @Put('/update-restaurant-menu-items/:restaurantId')
    updateRestaurantMenuItems(@Param('restaurantId') restaurantId: string, @Body() createMenuItemDto: CreateMenuItemDto) {
        console.log("api-gatweway", restaurantId, createMenuItemDto);
        this.logger.log("updateRestaurantMenuItems method called with data: " + JSON.stringify(createMenuItemDto));
        return this.natsClient
            .send({ cmd: 'update_restaurant_menu_items' }, { restaurantId, createMenuItemDto })
    }
}

import { CreateRestaurantDto } from "@app/common/dtos/create-restaurant.dto";
import { CreateMenuItemDto } from "@app/common/dtos/menuItems.dto";
import { Body, Controller, Inject, Logger, Post } from "@nestjs/common";
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
    //create restaurant menu items
    @Post('/add-items')
    createRestaurantMenuItems(@Body() createMenuItemDto: CreateMenuItemDto) {
        console.log("api-gatweway", createMenuItemDto);
        this.logger.log("createRestaurantMenuItems method called with data: " + JSON.stringify(createMenuItemDto));
        return this.natsClient
           .send({ cmd: 'add_items' }, createMenuItemDto)
    }
}

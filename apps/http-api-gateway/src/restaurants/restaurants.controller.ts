import { CreateRestaurantDto } from "@app/common/dtos/create-restaurant.dto";
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
}

import { CreateOrderggDto } from "@app/common/dtos/ordergg.dto";
import { Body, Controller, Inject, Logger, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";




@Controller('orders')
export class OrdersController {
 private readonly logger = new Logger(OrdersController.name);

    constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) { }

    @Post('/create-order')
    createOrder(@Body() createOrderDto: CreateOrderggDto) {
        console.log("api-gatweway", createOrderDto);
        this.logger.log("createOrder method called with data: " + JSON.stringify(createOrderDto));
        return this.natsClient
            .send({ cmd: 'create_order' }, createOrderDto)

    }

}
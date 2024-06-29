
import { Body, Controller, Get, Inject, Logger, Param, Post, Put, Delete } from "@nestjs/common";

import { ClientProxy } from "@nestjs/microservices";



@Controller('orders')
export class OrdersController{
    private readonly logger = new Logger(OrdersController.name);
    constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) { }
    //create-restaurant it will go to admin
    @Post('/create-order')
    createOrder(@Body() createOrderDto: CreateOrderDto) {
        console.log("api-gatweway", createOrderDto);
        this.logger.log("✅createOrder method called with data: " + JSON.stringify(createOrderDto));
        return this.natsClient
            .send({ cmd: 'create_order' }, createOrderDto)

    }
 

}
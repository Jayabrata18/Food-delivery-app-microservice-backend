import { CreateOrderDto, UpdateOrderStatusDto } from '@app/common';
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

@Controller('orders')
export class OrdersController {
    private readonly logger = new Logger(OrdersController.name);
    constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) { }
    //-----------------------Order Processing--------------------

    //create-order
    @Post('/create-order')
    createOrder(@Body() createOrderDto: CreateOrderDto) {
        console.log('api-gatweway', createOrderDto);
        this.logger.log(
            '✅createOrder method called with data: ' +
            JSON.stringify(createOrderDto),
        );
        return this.natsClient.send({ cmd: 'create_order' }, createOrderDto);
    }
    //get order by id
    @Get('/:orderId')
    getOrderById(@Param('orderId') orderId: string) {
        console.log('api-gatweway', orderId);
        this.logger.log('✅getOrderById method called with orderId:' + orderId);
        return this.natsClient.send({ cmd: 'get_order_by_id' }, { orderId });
    }
    //update order status
    @Put('/:orderId')
    updateOrderStatus(
        @Param('orderId') orderId: string,
        @Body() updateOrderStatusDto: UpdateOrderStatusDto,
    ) {
        console.log('api-gatweway', orderId, updateOrderStatusDto);
        this.logger.log(
            '✅updateOrderStatus method called with orderId:' + orderId,
        );
        return this.natsClient.send(
            { cmd: 'update_order_status' },
            { orderId, updateOrderStatusDto },
        );
    }
    //delete order by id
    @Delete('/:orderId')
    deleteOrderById(@Param('orderId') orderId: string) {
        console.log('api-gatweway', orderId);
        this.logger.log('✅deleteOrderById method called with orderId:' + orderId);
        return this.natsClient.send({ cmd: 'delete_order_by_id' }, { orderId });
    }
    
}

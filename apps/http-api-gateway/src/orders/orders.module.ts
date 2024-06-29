import { NatsClientModule } from "@app/common";
import { OrdersController } from "./orders.controller";
import { Module } from '@nestjs/common';





@Module({
    imports: [NatsClientModule],
    controllers: [OrdersController],
    providers: [],
})

export class OrdersModule { }
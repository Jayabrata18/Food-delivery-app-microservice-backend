import { Module } from '@nestjs/common';
import { NatsClientModule } from '@app/common/nats-client/nats-client.module';

@Module({
    imports: [NatsClientModule],
    controllers: [],
    providers: [],
})
export class RestaurantModue { }
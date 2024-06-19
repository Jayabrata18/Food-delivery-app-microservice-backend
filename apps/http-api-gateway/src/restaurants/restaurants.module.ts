import { Module } from '@nestjs/common';
import { NatsClientModule } from '@app/common/nats-client/nats-client.module';
import { RestaurantsController } from './restaurants.controller';

@Module({
    imports: [NatsClientModule],
    controllers: [RestaurantsController],
    providers: [],
})
export class RestaurantModue { }
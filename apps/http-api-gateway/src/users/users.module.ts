import { Module } from '@nestjs/common';
import { NatsClientModule } from 'libs/common/nats-client/nats-client.module';
import { UsersController } from './users.controller';

@Module({
    imports: [NatsClientModule],
    controllers: [UsersController],
    providers: [],
})
export class UsersModule { }
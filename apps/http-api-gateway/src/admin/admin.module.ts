import { Module } from '@nestjs/common';
import { NatsClientModule } from '@app/common/nats-client/nats-client.module';
import { AdminController } from './admin.conroller';

@Module({
    imports: [NatsClientModule],
    controllers: [AdminController],
    providers: [],
})
export class AdminModule { }
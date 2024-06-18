import { Logger, Module } from '@nestjs/common';
import { NatsClientModule } from '@app/common/nats-client/nats-client.module';
import { UsersMicroserviceController } from './users.controller';
import { UsersMicroserviceService } from './users.service';
import * as Joi from 'joi';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { pinoDevConfig, pinoProdConfig } from '@app/common';
// import { NatsJetStreamTransport } from '@nestjs-plugins/nestjs-nats-jetstream-transport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@app/common/entity/users/create-users.entity';
import { Order } from '@app/common/entity/orders/order.entity';
import { Restaurant } from '@app/common/entity/restaurant/create-restrudent.entity';
import { OrderItem } from '@app/common/entity/orders/orderItem.entity';
@Module({
  imports: [NatsClientModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationOptions: {
        allowUnknown: true,  // Ignore unknown environment variables
        abortEarly: false,   // Report all validation errors at once
      },
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().required().error(new Error('NODE_ENV is required')),
        NATS_URI: Joi.string().required().error(new Error('NATS_URI is required')),
        POSTGRES_HOST: Joi.string().required().error(new Error('POSTGRES_HOST is required')),
        POSTGRES_PORT: Joi.number().required().error(new Error('POSTGRES_PORT is required')),
        POSTGRES_USER: Joi.string().required().error(new Error('POSTGRES_USER is required')),
        POSTGRES_PASSWORD: Joi.string().required().error(new Error('POSTGRES_PASSWORD is required')),
        POSTGRES_DB: Joi.string().required().error(new Error('POSTGRES_DB is required')),
      }),
    }),
    LoggerModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        configService.getOrThrow<string>('NODE_ENV') === 'production'
          ? pinoProdConfig()
          : pinoDevConfig(),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DB'),
        entities: [User, Order, Restaurant, OrderItem],
        synchronize: true,  // Set to false in production
        dropSchema: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, Order, Restaurant, OrderItem]),
    // NatsJetStreamTransport.registerAsync({
    //   useFactory: (configService: ConfigService) => ({
    //     connectionOptions: {
    //       servers: configService.getOrThrow<string>('NATS_URI'),
    //       name: 'user-listener',
    //     },
    //   }),
    //   inject: [ConfigService],
    // }),
  ],
  controllers: [UsersMicroserviceController],
  providers: [UsersMicroserviceService, Logger],
})
export class UsersModule {
  constructor(private logger: Logger) {
    this.logger.verbose(UsersModule.name);
    this.logger.log('UsersModule initialized');
  }
}

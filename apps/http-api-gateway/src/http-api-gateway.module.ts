import { Logger, Module } from '@nestjs/common';
import { NatsClientModule } from '@app/common/nats-client/nats-client.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { LoggerModule } from 'nestjs-pino';
import { pinoDevConfig, pinoProdConfig } from '@app/common';
import { RestaurantModue } from './restaurants/restaurants.module';
@Module({
  imports: [NatsClientModule, UsersModule, RestaurantModue,
    ConfigModule.forRoot({
      isGlobal: true,
      validationOptions: {
        allowUnknown: true,  // Ignore unknown environment variables
        abortEarly: false,   // Report all validation errors at once
      },
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().required().error(new Error('NODE_ENV is required')),
        HTTP_PORT: Joi.number().required().error(new Error('HTTP_PORT is required')),
        NATS_URI: Joi.string().required().error(new Error('NATS_URI is required')),
      }),
      
    }),
    LoggerModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        configService.getOrThrow<string>('NODE_ENV') === 'production'
          ? pinoProdConfig()
          : pinoDevConfig(),
      inject: [ConfigService],
    }),

    // NatsJetStreamTransport.registerAsync({
    //   useFactory: (configService: ConfigService) => ({
    //     connectionOptions: {
    //       servers: configService.getOrThrow<string>('NATS_URI'),
    //       name: 'http-api-gateway-publisher',
    //     },
    //   }),
    //   inject: [ConfigService],
    // }),
  ],

  controllers: [],
  providers: [],
})
export class HttpApiGatewayModule {
  private readonly logger = new Logger(HttpApiGatewayModule.name);

  constructor() {
    this.logger.verbose(HttpApiGatewayModule.name)
    this.logger.log('HttpApiGatewayModule initialized');
  }
}

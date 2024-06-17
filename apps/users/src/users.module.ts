import { Logger, Module } from '@nestjs/common';
import { NatsClientModule } from '@app/common/nats-client/nats-client.module';
import { UsersMicroserviceController } from './users.controller';
import { UsersMicroserviceService } from './users.service';
import * as Joi from 'joi';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { pinoDevConfig, pinoProdConfig } from '@app/common';
import { NatsJetStreamTransport } from '@nestjs-plugins/nestjs-nats-jetstream-transport';
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
      }),
    }),
    LoggerModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        configService.getOrThrow<string>('NODE_ENV') === 'production'
          ? pinoProdConfig()
          : pinoDevConfig(),
      inject: [ConfigService],
    }),
    NatsJetStreamTransport.registerAsync({
      useFactory: (configService: ConfigService) => ({
        connectionOptions: {
          servers: configService.getOrThrow<string>('NATS_URI'),
          name: 'user-listener',
        },
      }),
      inject: [ConfigService],
    }),
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

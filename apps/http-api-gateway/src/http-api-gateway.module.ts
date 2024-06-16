import { Module } from '@nestjs/common';
import { NatsClientModule } from '@app/common/nats-client/nats-client.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { LoggerModule } from 'nestjs-pino';
import { NatsJetStreamTransport } from '@nestjs-plugins/nestjs-nats-jetstream-transport';
import { pinoDevConfig, pinoProdConfig } from '@app/common';
@Module({
  imports: [NatsClientModule, UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationOptions: {
        allowUnknown: true,  // Ignore unknown environment variables
        abortEarly: false,   // Report all validation errors at once
      },
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().required(),
        HTTP_PORT: Joi.number().required(),
        NATS_URI: Joi.string().required(),
      // validate(config) {
      //   const { error } = Joi.object({
      //     NODE_ENV: Joi.string().required(),
      //     PORT: Joi.number().required(),
      //     NATS_URI: Joi.string().required(),
      //   }).validate(config);
      //   if (error) {
      //     throw new Error(`Config validation error: ${error.message}`);
      //   }
      //   return config;
        
      // },
      
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
export class HttpApiGatewayModule { }

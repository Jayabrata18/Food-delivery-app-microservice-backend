import { Module } from '@nestjs/common';
import { NatsClientModule } from 'libs/common/nats-client/nats-client.module';
import { UsersModule } from './users/users.module';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import * as Joi from 'joi';
// import { LoggerModule } from 'nestjs-pino';
@Module({
  imports: [NatsClientModule, UsersModule,
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   validationSchema: Joi.object({
    //     NODE_ENV: Joi.string().required(),
     
    //     NATS_URI: Joi.string().required(),
       
    //   }),
    // }),
    // LoggerModule.forRootAsync({
    //   useFactory: (configService: ConfigService) =>
    //     configService.getOrThrow<string>('NODE_ENV') === 'production'
    //       ? pinoProdConfig()
    //       : pinoDevConfig(),
    //   inject: [ConfigService],
    // }),
  ],
  controllers: [],
  providers: [],
})
export class HttpApiGatewayModule {}

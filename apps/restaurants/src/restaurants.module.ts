import { Module } from '@nestjs/common';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';
import { NatsClientModule, pinoDevConfig, pinoProdConfig } from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import Joi from 'joi';

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
        entities: [],
        synchronize: true,  // Set to false in production
      }),
      inject: [ConfigService],
    }),
TypeOrmModule.forFeature([]),
  ],
  controllers: [RestaurantsController],
  providers: [RestaurantsService],
})
export class RestaurantsModule {}

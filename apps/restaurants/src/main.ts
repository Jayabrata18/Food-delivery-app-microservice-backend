import { NestFactory } from '@nestjs/core';
import { RestaurantsModule } from './restaurants.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(RestaurantsModule, { bufferLogs: true });
  const configService = appContext.get(ConfigService);
  const NATS_URI = configService.getOrThrow<string>('NATS_URI');
  const logger = new Logger('Restaurants-Microservice');
  logger.log('Starting Restaurants-Microservice bootstrap process...');
  logger.log(`Connecting to NATS at ${NATS_URI}`);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    RestaurantsModule,

    {
      transport: Transport.NATS,
      options: {
        servers: [NATS_URI],
      },
    },
  );

  logger.log('Restaurants-Microservice created');
  // app.setGlobalPrefix('Restaurantss');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // app.connectMicroservice<CustomStrategy>({
  //   strategy: new NatsJetStreamServer({
  //     connectionOptions: {
  //       servers: configService.getOrThrow<string>('NATS_URI'),
  //       name: 'Restaurants-listener',
  //     },
  //     consumerOptions: {
  //       deliverGroup: 'Restaurants-group',
  //       durable: 'Restaurants-durable',
  //       deliverTo: 'Restaurants-messages',
  //       manualAck: true,
  //     },
  //     streamConfig: {
  //       name: 'RestaurantsStream',
  //       subjects: ['Restaurants.>'],
  //     },
  //   }),
  // });
  await app.listen();
  logger.log('Restaurants-Microservice Bootstrap process completed');
}
bootstrap().catch((error) => {
  console.error('Restaurants-Microservice Bootstrap process failed with error:', error);
});
import { NestFactory } from '@nestjs/core';
import { OrdersModule } from './orders.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
const logger = new Logger('Orders Bootstrap');
logger.log('Starting Orders Bootstrap process...');
  const appContext = await NestFactory.createApplicationContext(OrdersModule, { bufferLogs: true });
  const configService = appContext.get(ConfigService);
  const NATS_URI = configService.getOrThrow<string>('NATS_URI')
  logger.log(`Connecting to NATS at ${NATS_URI}`);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OrdersModule,
    {
      transport: Transport.NATS,
      options: {
        servers: [NATS_URI],
      },
    },
  );
  logger.log('Microservice created');
  // app.setGlobalPrefix('users');
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
  logger.log('User-Microservice Bootstrap process completed');
}
bootstrap().catch((error) => {
  console.error('User-Microservice Bootstrap process failed with error:', error);
});
import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(UsersModule, { bufferLogs: true });
  const configService = appContext.get(ConfigService);
  const NATS_URI = configService.getOrThrow<string>('NATS_URI');
  const logger = new Logger('User-Microservice');
  logger.log('Starting User-Microservice bootstrap process...');
  logger.log(`Connecting to NATS at ${NATS_URI}`);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,

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
  //       name: 'user-listener',
  //     },
  //     consumerOptions: {
  //       deliverGroup: 'user-group',
  //       durable: 'user-durable',
  //       deliverTo: 'user-messages',
  //       manualAck: true,
  //     },
  //     streamConfig: {
  //       name: 'userStream',
  //       subjects: ['user.>'],
  //     },
  //   }),
  // });
  await app.listen();
  logger.log('User-Microservice Bootstrap process completed');
}
bootstrap().catch((error) => {
  console.error('User-Microservice Bootstrap process failed with error:', error);
});
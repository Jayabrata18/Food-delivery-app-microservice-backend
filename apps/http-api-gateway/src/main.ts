import { NestFactory } from '@nestjs/core';
import { HttpApiGatewayModule } from './http-api-gateway.module';
import { ValidationPipe } from '@nestjs/common';
// import { Logger } from 'nestjs-pino';
import { CustomStrategy, MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NatsJetStreamServer } from '@nestjs-plugins/nestjs-nats-jetstream-transport';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Http-Api-Gateway Bootstrap');
  logger.log('Starting Http-Api-Gateway Bootstrap process...');
  const app = await NestFactory.create(HttpApiGatewayModule, { bufferLogs: true });
  const configService = app.get(ConfigService);
  const HTTP_PORT = configService.getOrThrow('HTTP_PORT');
  const NATS_URI = configService.getOrThrow('NATS_URI');
  
  // app.useLogger(app.get(Logger));
  // app.use(cookieParser());
  logger.log('App created and logger set');
  app.useGlobalPipes(new ValidationPipe());
  logger.log('Global pipes set');
  const natsClientOptions: MicroserviceOptions = {
    transport: Transport.NATS,
    options: {
      servers: [NATS_URI],
    },
  };
  app.connectMicroservice(natsClientOptions);
  logger.log('Bootstrap process completed');
  // app.connectMicroservice<CustomStrategy>({
  //   strategy: new NatsJetStreamServer({
  //     connectionOptions: {
  //       servers: configService.getOrThrow<string>('NATS_URI'),
  //       name: 'http-api-gateway-publisher',
  //     },
  //     consumerOptions: {
  //       deliverGroup: 'gateway-group',
  //       durable: 'gateway-durable',
  //       deliverTo: 'gateway-messages',
  //       manualAck: true,
  //     },
  //     streamConfig: {
  //       name: 'gatewayStream',
  //       subjects: ['gateway.>'],
  //     },
  //   }),
  // });

  await app.startAllMicroservices();
  // const PORT = 3000;
  await app.listen(HTTP_PORT, () => {
    console.log(`  🚀   Microservice is running at port ${HTTP_PORT}`);
    logger.log(`  🚀   Microservice is running at port ${HTTP_PORT}`);
  });
}
bootstrap().catch((error) => {
  console.error('Bootstrap process failed with error:', error);
});



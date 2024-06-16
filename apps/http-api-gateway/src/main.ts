import { NestFactory } from '@nestjs/core';
import { HttpApiGatewayModule } from './http-api-gateway.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { CustomStrategy, MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NatsJetStreamServer } from '@nestjs-plugins/nestjs-nats-jetstream-transport';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(HttpApiGatewayModule, { bufferLogs: true });
  // const configService = app.get(ConfigService);
  app.useLogger(app.get(Logger));
  // app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  const natsClientOptions: MicroserviceOptions = {
    transport: Transport.NATS,
    options: {
      servers: ['nats://nats'],
    },
  };
  app.connectMicroservice(natsClientOptions);

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
  const PORT = 3000;
  await app.listen(PORT, () => {
    console.log(`  🚀   Microservice is running at port ${PORT}`);
  });
//   await app.listen((configService.getOrThrow('HTTP_PORT')));
// //add message
//   console.log(`  🚀   Microservice is running at port ${configService.getOrThrow('HTTP_PORT')}`);

}
bootstrap();

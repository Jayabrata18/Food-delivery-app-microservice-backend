import { NestFactory } from '@nestjs/core';
import { HttpApiGatewayModule } from './http-api-gateway.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { CustomStrategy, MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NatsJetStreamServer } from '@nestjs-plugins/nestjs-nats-jetstream-transport';
// import { ConfigService } from '@nestjs/config';
// const logger = new Logger('Http-Api-Gateway');

async function bootstrap() {
  const app = await NestFactory.create(HttpApiGatewayModule, { bufferLogs: true });
  // const configService = app.get(ConfigService);
  // app.useLogger(app.get(Logger));

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
  //       name: 'account-listener',
  //     },
  //     consumerOptions: {
  //       deliverGroup: 'account-group',
  //       durable: 'account-durable',
  //       deliverTo: 'account-messages',
  //       manualAck: true,
  //     },
  //     streamConfig: {
  //       name: 'accountStream',
  //       subjects: ['account.>'],
  //     },
  //   }),
  // });

  await app.startAllMicroservices();
  const PORT = 3000;
  await app.listen(PORT, () => {
    console.log(`  🚀   Microservice is running at port ${PORT}`);
  });
}
bootstrap();

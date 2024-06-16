import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { CustomStrategy, MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser'
import { ConfigService } from '@nestjs/config';
import { NatsJetStreamServer } from '@nestjs-plugins/nestjs-nats-jetstream-transport';
async function bootstrap() {
  // const app = await NestFactory.create(UsersModule, { bufferLogs: true });
  // const configService = app.get(ConfigService);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    
    {
      transport: Transport.NATS,
      options: {
        servers: ['nats://nats'],
      },
    },
  );
 
  app.useLogger(app.get(Logger));
  // app.use(cookieParser());
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

  // await app.init();
  // await app.startAllMicroservices();

}
bootstrap();
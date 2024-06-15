import { NestFactory } from '@nestjs/core';
import { HttpApiGatewayModule } from './http-api-gateway.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

const logger = new Logger('Http-Api-Gateway');

async function bootstrap() {
  const app = await NestFactory.create(HttpApiGatewayModule);
  app.useGlobalPipes(new ValidationPipe());
  const natsClientOptions: MicroserviceOptions = {
    transport: Transport.NATS,
    options: {
      servers: ['nats://nats'],
    },
  };
  app.connectMicroservice(natsClientOptions);

  await app.startAllMicroservices();
  const PORT = 3000;
  await app.listen(PORT, () => {
    console.log(`  🚀   Microservice is running at port ${PORT}`);
  });
}
bootstrap();

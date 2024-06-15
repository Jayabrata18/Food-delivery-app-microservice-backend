import { NestFactory } from '@nestjs/core';
import { RestaurantsModule } from './restaurants.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  console.log('Dont Worry!!    🚀   users-microservice is running !!');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    RestaurantsModule,
    {
      transport: Transport.NATS,
      options: {
        servers: ['nats://nats'],
      },
    },
  );
  await app.listen();
}
bootstrap();
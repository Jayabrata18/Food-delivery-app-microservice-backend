import { NestFactory } from '@nestjs/core';
import { DeliveryPartnersModule } from './delivery-partners.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  const logger = new Logger('DeliveryPartners Bootstrap');
  logger.log('Starting DeliveryPartners Bootstrap process...');
  const appContext = await NestFactory.createApplicationContext(DeliveryPartnersModule, { bufferLogs: true });
  const configService = appContext.get(ConfigService);
  const NATS_URI = configService.getOrThrow<string>('NATS_URI')
  logger.log(`Connecting to NATS at ${NATS_URI}`);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    DeliveryPartnersModule,
    {
      transport: Transport.NATS,
      options: {
        servers: [NATS_URI],
      },
    },
  );
  logger.log('Microservice created');
  // app.setGlobalPrefix('delivery-partners');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen();
  logger.log('DeliveryPartners-Microservice Bootstrap process completed');
}
bootstrap().catch((error) => {
  console.error('DeliveryPartners-Microservice Bootstrap process failed with error:', error);
});

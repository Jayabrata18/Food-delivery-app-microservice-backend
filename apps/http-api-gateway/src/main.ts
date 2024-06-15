import { NestFactory } from '@nestjs/core';
import { HttpApiGatewayModule } from './http-api-gateway.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(HttpApiGatewayModule);
  app.useGlobalPipes(new ValidationPipe());
  const PORT = 3000;
  await app.listen(PORT, () => {
    console.log(`  🚀   Microservice is running at port ${PORT}`);
  });
}
bootstrap();

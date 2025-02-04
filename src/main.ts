import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { httpsCertificate } from './config/https-certificate';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions: httpsCertificate(),
  });
  const logger = new Logger('bootstrap');
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`Servidor corriendo en el puerto: ${port}`);
}
bootstrap();

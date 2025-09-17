import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { httpsCertificate } from './config/https-certificate';
import { Logger } from '@nestjs/common';
import { ValidatorPipe } from './config/validator.pipe';

async function bootstrap() {
  const options = httpsCertificate();
  const app = await NestFactory.create(
    AppModule,
    options ? { httpsOptions: options } : {},
  );
  const logger = new Logger('bootstrap');
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(ValidatorPipe);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`Servidor corriendo en el puerto: ${port}`);
  logger.log('Versión de la aplicación: 1.0.0');
}
bootstrap();

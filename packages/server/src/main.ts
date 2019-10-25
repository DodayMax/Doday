require('module-alias/register');
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
//
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter()
  );
  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true }));
  app.disable('x-powered-by');

  const options = new DocumentBuilder()
    .setTitle('DoDay API')
    .setDescription('Description of DoDay API service')
    .setVersion(`${process.env.npm_package_version}`)
    .setSchemes(!process.env.NODE_ENV ? 'http' : 'https')
    .setBasePath('api')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.PORT || 5000);
}

bootstrap();

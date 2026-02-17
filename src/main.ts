import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  if (process.env.SWAGGER_ENABLED !== 'false') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle(process.env.SWAGGER_TITLE ?? 'Pintu Rumah API')
      .setDescription(process.env.SWAGGER_DESCRIPTION ?? 'API documentation')
      .setVersion(process.env.SWAGGER_VERSION ?? '1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    const swaggerPath = process.env.SWAGGER_PATH ?? 'docs';
    SwaggerModule.setup(swaggerPath, app, document);
  }

  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port);
}
bootstrap();

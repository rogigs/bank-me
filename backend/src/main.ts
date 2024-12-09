import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // TODO: add correct rules
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  app.enableVersioning({
    type: VersioningType.URI,
  });

  // TODO: show rule to appear just in DEV: SEC
  const config = new DocumentBuilder()
    .setTitle('Bankme')
    .setDescription('The BankMe API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document, {
    jsonDocumentUrl: 'swagger/json',
    swaggerOptions: { persistAuthorization: true },
  });

  await app.listen(4000);

  console.log('\x1b[36m%s\x1b[0m', 'App is listening on port 4000 🏃🏃🏃🏃🏃');
}
bootstrap();

export function generateMainDoTsFile() {
  return `
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { RedocModule } from 'nestjs-redoc';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: false }));

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('TODO API')
    .setDescription('The todo API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const redocOptions = {
    auth: {
      enabled: true,
      user: 'admin',
      password: 'admin',
    },
  };
  await RedocModule.setup('redocs', app as any, document, redocOptions);

  await app.listen(6100);
}
bootstrap();
`;
}

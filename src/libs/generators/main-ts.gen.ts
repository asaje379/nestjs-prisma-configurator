import { Generator } from '.';

export interface MainDotTsConfig {
  port?: string;
  prefix?: string;
  doc?: SwaggerDocConfig;
}

export interface SwaggerDocConfig {
  title?: string;
  description?: string;
  version?: string;
  path?: {
    swagger?: string;
    redocs?: string;
  };
  auth?: {
    user?: string;
    pass?: string;
  };
}

export class MainDotTsGenerator extends Generator {
  config: MainDotTsConfig;

  constructor(config: MainDotTsConfig) {
    super();
    this.config = config;
    console.log(config);
  }

  generate(): string {
    return `
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { RedocModule } from 'nestjs-redoc';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: false }));
  app.enableCors();

  ${
    this.config.prefix
      ? 'app.setGlobalPrefix(' + JSON.stringify(this.config.prefix) + ');'
      : ''
  }

  const config = new DocumentBuilder()
    .setTitle(${JSON.stringify(this.config.doc?.title) ?? 'API Title'})
    .setDescription(${
      JSON.stringify(this.config.doc?.description) ?? 'API Description'
    })
    .setVersion(${JSON.stringify(this.config.doc?.version) ?? '1.0'})
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(${
    JSON.stringify(this.config.doc?.path?.swagger) ?? 'docs'
  }, app, document);

  const redocOptions = {
    auth: {
      enabled: true,
      user: ${JSON.stringify(this.config.doc?.auth?.user ?? 'admin')},
      password: ${JSON.stringify(this.config.doc?.auth?.pass ?? 'admin')},
    },
  };
  await RedocModule.setup(${
    JSON.stringify(this.config.doc?.path?.redocs) ?? 'redocs'
  }, app as any, document, redocOptions);

  await app.listen(${this.config.port});
}
bootstrap();
`;
  }
}

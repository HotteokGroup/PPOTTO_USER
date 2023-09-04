import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  const servicePort = configService.getOrThrow<string>('SERVICE_PORT');
  const environment = configService.getOrThrow<string>('ENVIRONMENT');

  if (environment !== 'prod') {
    const config = new DocumentBuilder()
      .setTitle('PPOTTO User API')
      .setDescription('뽀또 유저서비스')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(servicePort);
}
bootstrap();

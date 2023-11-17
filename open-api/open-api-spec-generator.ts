import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { AppModule } from '../src/app.module';
import { CustomLogger } from '../src/lib/logger/custom-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const config = new DocumentBuilder()
    .setTitle('PPOTTO User API')
    .setDescription('뽀또 유저서비스')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  writeFileSync('open-api/open-api-spec.json', JSON.stringify(document));

  return true;
}
bootstrap();

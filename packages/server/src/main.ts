import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    methods: ['POST, GET, PATCH'],
  });

  app.use(json({ limit: '50mb' }));

  await app.listen(3001);
}
bootstrap();

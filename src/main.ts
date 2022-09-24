import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/modules/app/app.module';
import { Logger } from '@nestjs/common';

const logger = new Logger();
const port = 5551;

(async function () {
  const app = await NestFactory.create(AppModule, {
    cors: {
      credentials: true,
    },
  });

  app.setGlobalPrefix('api/v1');
  await app.listen(port);

  logger.log(`Server start on http://localhost:${port}`);
})();

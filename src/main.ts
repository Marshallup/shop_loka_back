import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

const logger = new Logger();
const port = 5551;

(async function () {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    cors: {
      credentials: true,
    },
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.setGlobalPrefix('api/v1');
  await app.listen(port);

  logger.log(`Server start on http://localhost:${port}`);
})();

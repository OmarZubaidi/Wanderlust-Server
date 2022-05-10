import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
const PORT = process.env.PORT || 3332;

async function bootstrap() {
  // create application instance with express by default
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  await app.listen(PORT, () =>
    Logger.log(`🚀 Server is running on http://localhost:${PORT} 🚀`),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      // when set to true, this will automatically remove non-whitelisted properties
      whitelist: true,
    }),
  );
}
bootstrap();

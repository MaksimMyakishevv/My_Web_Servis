import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port: number = parseInt(process.env.PORT);
  const server = process.env.SERVER;
  console.log('port for conection', port, server);
  await app.listen(port, server);
  console.log(`aplication is runnig on: ${await app.getUrl()}`);
}
bootstrap();

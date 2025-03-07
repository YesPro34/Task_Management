import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger'


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

   // Configure Swagger
   const config = new DocumentBuilder()
   .setTitle('Task Management API')
   .setDescription('API for managing tasks')
   .setVersion('1.0')
   .addTag('tasks')  // Optional: Group endpoints by tags
   .addBearerAuth()  // Enable Bearer Auth (if using JWT)
   .build();

 const document = SwaggerModule.createDocument(app, config);
 SwaggerModule.setup('api', app, document);  // Serve docs at `/api`

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

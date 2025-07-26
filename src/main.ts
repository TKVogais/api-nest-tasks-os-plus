import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


const titleDocAPI = "API Tasks SO+"
const description = "Documentação API Teste Técnico"
const version = "1.0.0"


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle(titleDocAPI)
    .setDescription(description)
    .setVersion(version)
    .addBearerAuth()
    .build()

  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({
    origin: true, // frontend
    credentials: true
  })

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(process.env.PORT ?? 4000);
}

bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyStatic from '@fastify/static';
import fastifyView from '@fastify/view';
import * as hbs from 'hbs';
import glob from 'glob';
import * as fs from 'fs';



async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  // Serve static assets (CSS, JS, images)
  app.register(fastifyStatic, {
    root: join(__dirname, '..', 'public'),
    prefix: '/public/', // Makes assets accessible at "/public/"
  });

  app.register(fastifyView, {
    engine: {
      handlebars: hbs,
    },
    root: join(__dirname, '..', 'views'), // Views folder
  });

  const partialsDir = join(__dirname, '..', 'views', 'partials');
  hbs.registerPartial('navbar', fs.readFileSync(join(partialsDir, '_navbar.hbs'), 'utf8'));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

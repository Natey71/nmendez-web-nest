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
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  // Serve static assets (CSS, JS, images)
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  app.register(fastifyStatic, {
    root: join(__dirname, '..', 'public'),
    prefix: '/public/', // Makes assets accessible at "/public/"
  });

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  app.register(fastifyView, {
    engine: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      handlebars: hbs,
    },
    root: join(__dirname, '..', 'views'), // Views folder
  });

  const partialsDir = join(__dirname, '..', 'views', 'partials');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  hbs.registerPartial(
    'navbar',
    fs.readFileSync(join(partialsDir, '_navbar.hbs'), 'utf8'),
  );

  await app.listen(process.env.PORT ?? 3000);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();

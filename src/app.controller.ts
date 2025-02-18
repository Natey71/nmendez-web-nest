/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { FastifyReply } from 'fastify';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  @Render('index')
  getHome() {
    return {
      title: 'Home',
      code: 'console.log("Hello, Home");'
    };
  }

  @Get('about')
  @Render('about')
  getAbout(){
    return {
      title: 'About',
      code: '<h1>This is about</h1>'
    };
  }


}

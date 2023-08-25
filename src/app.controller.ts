import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from 'app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  async root(@Res() res: Response) {
    const { req } = res;
    const userMessage: string = await this.appService.CheckUser(req);

    return res.render('main', { layout: 'index', userMessage });
  }
}

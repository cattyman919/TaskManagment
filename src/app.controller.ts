import { Controller, Get, Render, Req, Res } from '@nestjs/common';
import RequestWithUser from 'auth/interface/RequestWithUser.interface';
import { Response } from 'express';
import { User } from 'users/entities/user.entity';

@Controller()
export class AppController {
  // @Get()
  // @Render('index')
  // root(@Req() request: RequestWithUser) {
  //   let user: any;
  //   if (request.user) user = request.user.username;
  //   else user = 'No Account has been Signed In';
  //   return { user };
  // }

  @Get()
  root(@Res() res: Response) {
    const theUser = res.req.user as User;
    console.log('The User : ', theUser);
    let userMessage: any;
    if (theUser) userMessage = theUser.username;
    else userMessage = 'NULL';

    return res.render('main', { layout: 'index', userMessage });
  }
}

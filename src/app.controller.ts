import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/q1')
  question1(@Query('n') n: string): string {
    return this.appService.getQuestion1(Number(n));
  }

  @Get('/q2')
  question2(): number[][] {
    return this.appService.getQuestion2();
  }

  @Get('/q3')
  question3(@Query('n') n: string): string {
    return this.appService.getQuestion3(Number(n));
  }

}

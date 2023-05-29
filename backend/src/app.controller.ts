import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('lottery-address')
  getLotteryAddress() {
    return this.appService.getLotteryAddress();
  }
  @Get('token-address')
  getTokenAddress() {
    return this.appService.getTokenAddress();
  }

  @Get('state')
  async getLotteryState(): Promise<string> {
    return this.appService.checkState();
  }

  @Get('token-balance/:address')
  async getTokenBalance(@Param('address') address: string): Promise<string> {
    return this.appService.displayTokenBalance(address);
  }

  @Post('buy-tokens')
  async buyTokens(
    @Body() data: { address: string; amount: string },
  ): Promise<string> {
    const { address, amount } = data;
    return this.appService.buyTokens(address, amount);
  }
}

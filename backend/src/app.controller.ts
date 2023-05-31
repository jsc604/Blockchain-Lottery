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

  @Get('eth-balance/:address')
  async getEthBalance(@Param('address') address: string): Promise<string> {
    return this.appService.displayEthBalance(address);
  }

  @Get('prize-pool')
  getPrizePool() {
    return this.appService.displayPrizePool();
  }

  @Post('open-bets')
  async openBets(@Body('duration') duration: string) {
    return this.appService.openBets(duration);
  }

  @Post('close-lottery')
  async closeLottery() {
    return this.appService.closeLottery();
  }

  @Post('buy')
  async buyTokens(
    @Body('address') address: string,
    @Body('amount') amount: string,
  ): Promise<string> {
    return this.appService.buyTokens(address, amount);
  }

  @Post('bet')
  async bet(
    @Body('address') address: string,
    @Body('amount') amount: string,
  ): Promise<string> {
    return this.appService.bet(address, amount);
  }

  @Get('prize/:address')
  async displayPrize(@Param('address') address: string): Promise<string> {
    return this.appService.displayPrize(address);
  }

  @Post('claim-prize')
  async claimPrize(
    @Body('address') address: string,
    @Body('amount') amount: string,
  ): Promise<string> {
    return this.appService.claimPrize(address, amount);
  }

  @Get('owner-pool')
  async displayOwnerPool() {
    return this.appService.displayOwnerPool();
  }

  @Post('withdraw-owner-pool')
  async withdrawTokens(@Body('amount') amount: string): Promise<string> {
    return this.appService.withdrawTokens(amount);
  }

  @Post('burn-tokens')
  async burnTokens(
    @Body('address') address: string,
    @Body('amount') amount: string,
  ) {
    return this.appService.burnTokens(address, amount);
  }
}

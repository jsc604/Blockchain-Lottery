import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { ConfigService } from '@nestjs/config';
import * as tokenJson from '../assets/LotteryToken.json';
import * as lotteryJson from '../assets/Lottery.json';

@Injectable()
export class AppService {
  provider: ethers.providers.BaseProvider;
  lotteryContract: ethers.Contract;
  tokenContract: ethers.Contract;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('ALCHEMY_API_KEY');
    this.provider = new ethers.providers.AlchemyProvider('goerli', apiKey);
    this.tokenContract = new ethers.Contract(
      this.getTokenAddress(),
      tokenJson.abi,
      this.provider,
    );
    this.lotteryContract = new ethers.Contract(
      this.getLotteryAddress(),
      lotteryJson.abi,
      this.provider,
    );
  }

  getTokenAddress() {
    const tokenAddress = this.configService.get<string>('TOKEN_ADDRESS');
    return tokenAddress;
  }

  getLotteryAddress() {
    const lotteryAddress = this.configService.get<string>('LOTTERY_ADDRESS');
    return lotteryAddress;
  }

  private readonly BET_PRICE = 1;
  private readonly BET_FEE = 0.2;
  private readonly TOKEN_RATIO = 1000;

  async checkState() {
    const state = await this.lotteryContract.betsOpen();
    console.log(state);
    let result = `The lottery is ${state ? 'open' : 'closed'}\n`;

    if (!state) return result;

    const currentBlock = await this.provider.getBlock('latest');
    const currentBlockDate = new Date(currentBlock.timestamp * 1000);
    const closingTime = await this.lotteryContract.betsClosingTime();
    const closingTimeDate = new Date(closingTime.toNumber() * 1000);

    result += `The last block was mined at ${currentBlockDate.toLocaleDateString()} : ${currentBlockDate.toLocaleTimeString()}\n`;
    result += `The lottery should close at ${closingTimeDate.toLocaleDateString()} : ${closingTimeDate.toLocaleTimeString()}\n`;

    return result;
  }

  async displayTokenBalance(address: string) {
    const balanceBN = await this.tokenContract.balanceOf(address);
    const balance = ethers.utils.formatEther(balanceBN);
    const result = balance;
    return result;
  }

  async displayPrizePool() {
    const prizePool = await this.lotteryContract.prizePool();
    return prizePool;
  }
}

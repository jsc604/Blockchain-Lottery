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
    let result = `The lottery is ${state ? 'open' : 'closed'}`;

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

  async displayEthBalance(address: string) {
    const balanceBN = await this.provider.getBalance(address);
    const balance = ethers.utils.formatEther(balanceBN);
    return `The account of address ${address} has ${balance} ETH`;
  }

  async displayPrizePool() {
    const prizePool = await this.lotteryContract.prizePool();
    return prizePool;
  }

  async openBets(duration: string) {
    const currentBlock = await this.provider.getBlock('latest');
    const tx = await this.lotteryContract.openBets(
      currentBlock.timestamp + Number(duration),
    );
    const receipt = await tx.wait();
    return `Bets opened (${receipt.transactionHash})`;
  }

  async closeLottery() {
    const tx = await this.lotteryContract.closeLottery();
    const receipt = await tx.wait();
    return `Bets closed (${receipt.transactionHash})`;
  }

  async buyTokens(address: string, amount: string) {
    const tx = await this.lotteryContract.connect(address).purchaseTokens({
      value: ethers.utils.parseEther(amount).div(this.TOKEN_RATIO),
    });
    const receipt = await tx.wait();
    return `Tokens bought (${receipt.transactionHash})`;
  }

  async bet(address: string, amount: string) {
    const allowTx = await this.tokenContract
      .connect(address)
      .approve(this.lotteryContract.address, ethers.constants.MaxUint256);
    await allowTx.wait();
    const tx = await this.lotteryContract.connect(address).betMany(amount);
    const receipt = await tx.wait();
    return `Bets placed (${receipt.transactionHash})`;
  }

  async displayPrize(address: string): Promise<string> {
    const prizeBN = await this.lotteryContract.prize(address);
    const prize = ethers.utils.formatEther(prizeBN);
    console.log(
      `The account of address ${address} has earned a prize of ${prize} Tokens`,
    );
    return prize;
  }

  async claimPrize(address: string, amount: string) {
    const tx = await this.lotteryContract
      .connect(address)
      .prizeWithdraw(ethers.utils.parseEther(amount));
    const receipt = await tx.wait();
    return `Prize claimed (${receipt.transactionHash})`;
  }

  async displayOwnerPool() {
    const balanceBN = await this.lotteryContract.ownerPool();
    const balance = ethers.utils.formatEther(balanceBN);
    console.log(`The owner pool has (${balance}) Tokens \n`);
    return balance;
  }

  async withdrawTokens(amount: string) {
    const tx = await this.lotteryContract.ownerWithdraw(
      ethers.utils.parseEther(amount),
    );
    const receipt = await tx.wait();
    return `Withdraw confirmed (${receipt.transactionHash})`;
  }

  async burnTokens(address: string, amount: string) {
    const allowTx = await this.tokenContract
      .connect(address)
      .approve(this.lotteryContract.address, ethers.constants.MaxUint256);
    const receiptAllow = await allowTx.wait();
    const tx = await this.lotteryContract
      .connect(address)
      .returnTokens(ethers.utils.parseEther(amount));
    const receipt = await tx.wait();
    return {
      allowance: receiptAllow.transactionHash,
      burn: receipt.transactionHash,
    };
  }
}

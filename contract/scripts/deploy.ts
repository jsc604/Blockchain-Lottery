const ethers = require('ethers');
require('dotenv').config();
const lotteryJson = require('../artifacts/contracts/Lottery.sol/Lottery.json');
const LotteryTokenJson = require('../artifacts/contracts/LotteryToken.sol/LotteryToken.json');

async function main() {
  const url = process.env.GOERLI_URL;
  const provider = new ethers.providers.JsonRpcProvider(url);
  const privateKey = process.env.PRIVATE_KEY;
  const wallet = new ethers.Wallet(privateKey, provider);

  const factory = new ethers.ContractFactory(lotteryJson.abi, lotteryJson.bytecode, wallet);

  const BET_PRICE = 1;
  const BET_FEE = 0.2;
  const TOKEN_RATIO = 1000;

  const contract = await factory.deploy(
    'LotteryToken',
    'LT0',
    TOKEN_RATIO,
    ethers.utils.parseEther(BET_PRICE.toFixed(18)),
    ethers.utils.parseEther(BET_FEE.toFixed(18))
  );

  console.log('Lottery address:', contract.address);

  await contract.deployed();

  const tokenAddress = await contract.paymentToken();
  const tokenFactory = new ethers.ContractFactory(LotteryTokenJson.abi, LotteryTokenJson.bytecode, wallet);
  const token = await tokenFactory.attach(tokenAddress);

  console.log('Lottery Token address:', token.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});

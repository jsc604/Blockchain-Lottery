import { Heading, Spinner } from '@chakra-ui/react';
import { useContractRead } from 'wagmi';
import * as lotteryJson from '../../assets/Lottery.json';
import { ethers } from 'ethers';

export default function PrizePool() {
  const { data, isLoading } = useContractRead({
    address: import.meta.env.VITE_LOTTERY_ADDRESS,
    abi: lotteryJson.abi,
    functionName: 'prizePool',
    watch: true,
  })

  return (
    <Heading>
      {data ? <Spinner /> : `Prize pool: ${ethers.utils.formatEther(data as ethers.BigNumber)} LT0`}
    </Heading>
  );
};

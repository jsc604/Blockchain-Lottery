import { Box, Spinner } from '@chakra-ui/react';
import { useAccount, useContractRead } from 'wagmi';
import * as tokenJson from '../../assets/LotteryToken.json';
import { ethers } from 'ethers';

export default function LotteryTokenBalance() {
  const { address } = useAccount();

  const {data, isLoading} = useContractRead({
    address: import.meta.env.VITE_TOKEN_ADDRESS,
    abi: tokenJson.abi,
    functionName: 'balanceOf',
    args: [address],
    watch: true,
  })

  const balance = ethers.utils.formatEther(data as ethers.BigNumber);

  return (
    <Box>
       {isLoading ? <Spinner /> : `LT0: ${balance}`}
    </Box>
  );
};

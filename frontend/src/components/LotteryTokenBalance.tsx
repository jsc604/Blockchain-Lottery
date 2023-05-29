import { Box, Spinner } from '@chakra-ui/react';
import { useAccount, useContractRead } from 'wagmi';
import * as tokenJson from '../../assets/LotteryToken.json';
import { ethers } from 'ethers';

export default function LotteryTokenBalance() {
  const { address } = useAccount();

  const {data, isLoading, isSuccess} = useContractRead({
    address: import.meta.env.VITE_TOKEN_ADDRESS,
    abi: tokenJson.abi,
    functionName: 'balanceOf',
    args: [address],
    watch: true,
  })

  return (
    <Box>
       {isLoading && <Spinner /> }
       {isSuccess && `LT0: ${ethers.utils.formatEther(data as ethers.BigNumber)}`}
    </Box>
  );
};

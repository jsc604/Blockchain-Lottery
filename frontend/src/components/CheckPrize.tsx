import { useAccount, useContractRead } from "wagmi"
import * as lotteryJson from '../../assets/Lottery.json';
import { formatEther } from "ethers/src.ts/utils";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { Dispatch } from "react";
import { BigNumber } from "ethers";

interface pageProps {
  setPrize: Dispatch<React.SetStateAction<string>>
}

export default function CheckPrize({setPrize}: pageProps) {
  const { address } = useAccount();

  const { data, isFetching, refetch } = useContractRead({
    address: import.meta.env.VITE_LOTTERY_ADDRESS,
    abi: lotteryJson.abi,
    functionName: 'prize',
    args: [address],
  })

  const prizeAmount = data ? formatEther(data as BigNumber) : '0';

  const handlefetchPrize = () => {
    refetch();
    setPrize(prizeAmount);
  }

  return (
    <Box width={'fit-content'}>
      <Heading>Check Prize</Heading>
      <Text marginY={8} fontSize={'xl'}>Click to check if you won any of our past lotteries</Text>
      <Button
        colorScheme='linkedin'
        onClick={handlefetchPrize}
        isLoading={isFetching}
        loadingText='Checking...'
      >
        Check
      </Button>
    </Box>
  )
}

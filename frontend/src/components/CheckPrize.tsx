import { useAccount, useContractRead } from "wagmi"
import * as lotteryJson from '../../assets/Lottery.json';
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { Dispatch } from "react";
import { BigNumber, ethers } from "ethers";

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

  const prizeAmount = data ? ethers.utils.formatEther(data as BigNumber) : '0';

  const handlefetchPrize = () => {
    refetch();
    setPrize(prizeAmount);
  }

  return (
    <Box maxWidth={350} width={'80%'} display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
      <Heading>Check Prize</Heading>
      <Text marginY={8} fontSize={'xl'}>Click to check if you won any of our past lotteries</Text>
      <Button
        colorScheme='green'
        backgroundColor={'#85be00'}
        onClick={handlefetchPrize}
        isLoading={isFetching}
        loadingText='Checking...'
      >
        Check Prize
      </Button>
    </Box>
  )
}

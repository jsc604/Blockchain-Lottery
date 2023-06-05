import { useContractWrite, useWaitForTransaction } from "wagmi"
import * as lotteryJson from '../../assets/Lottery.json';
import { Box, Button } from "@chakra-ui/react";

export default function CloseBets() {

  const { write, data } = useContractWrite({
    address: import.meta.env.VITE_LOTTERY_ADDRESS,
    abi: lotteryJson.abi,
    functionName: 'closeLottery',
  });

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash
  })

  return (
    <Box maxWidth={350} width={'80%'} display={'flex'} flexDirection={'column'}>
      <Button
        colorScheme="green"
        backgroundColor={'#85be00'}
        onClick={() => write()}
        isLoading={isLoading}
        loadingText='Closing Bets...'
      >
        Close Bets
      </Button>
    </Box>
  )
}

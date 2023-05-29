import { useContractWrite } from "wagmi"
import * as lotteryJson from '../../assets/Lottery.json';
import { Box, Button } from "@chakra-ui/react";

export default function CloseBets() {

  const { write, isError } = useContractWrite({
    address: import.meta.env.VITE_LOTTERY_ADDRESS,
    abi: lotteryJson.abi,
    functionName: 'closeLottery',
  });

  console.log('isError: ', isError);

  return (
    <Box width={'fit-content'} textAlign={'center'}>
      <Button colorScheme="blue" onClick={() => write()}>Close Bets</Button>
    </Box>
  )
}

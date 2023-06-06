import { useContractRead } from 'wagmi';
import * as lotteryJson from '../../assets/Lottery.json';
import { Box } from '@chakra-ui/react';
import CloseBets from './CloseBets';
import OpenBets from './OpenBets';

export default function BetsToggle() {
  const { data } = useContractRead({
    address: import.meta.env.VITE_LOTTERY_ADDRESS,
    abi: lotteryJson.abi,
    functionName: 'betsOpen',
    // watch: true,
  });

  return (
    <Box>
      {data ? <CloseBets /> : <OpenBets />}
    </Box>
  )
}

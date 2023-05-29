import { Heading, Spinner } from '@chakra-ui/react';
import { useContractRead } from 'wagmi';
import * as lotteryJson from '../../assets/Lottery.json';

export default function CheckState() {
  const { data, isFetching } = useContractRead({
    address: import.meta.env.VITE_LOTTERY_ADDRESS,
    abi: lotteryJson.abi,
    functionName: 'betsOpen',
    watch: true,
  });

  return (
    <>
      {isFetching ? <Spinner /> : (data ? <Heading>Lottery is open</Heading> : <Heading>Lottery is closed</Heading>)}
    </>
  )
}


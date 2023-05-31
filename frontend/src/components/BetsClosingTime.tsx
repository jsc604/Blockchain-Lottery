import { useContractRead } from "wagmi"
import * as lotteryJson from '../../assets/Lottery.json';
import { Text } from "@chakra-ui/react";

export default function BetsClosingTime() {

  const { data } = useContractRead({
    address: import.meta.env.VITE_LOTTERY_ADDRESS,
    abi: lotteryJson.abi,
    functionName: 'betsClosingTime',
    watch: true,
  })

  const closingTimeDate = new Date(Number(data) * 1000);

  return (
    <>
      {data && <Text fontSize={'2xl'}>{`Bets will close at ${closingTimeDate.toLocaleDateString()} : ${closingTimeDate.toLocaleTimeString()}\n`}</Text>}
    </>
  )
}

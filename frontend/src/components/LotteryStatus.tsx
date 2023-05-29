import { useContractRead } from "wagmi"
import * as lotteryJson from '../../assets/Lottery.json';
import CheckState from "./CheckState";
import BetsClosingTime from "./BetsClosingTime";

export default function LotteryStatus() {
  const { data } = useContractRead({
    address: import.meta.env.VITE_LOTTERY_ADDRESS,
    abi: lotteryJson.abi,
    functionName: 'betsOpen',
    watch: true,
  })

  return (
    <>
      <CheckState />
      {data && <BetsClosingTime />}
    </>
  )
}

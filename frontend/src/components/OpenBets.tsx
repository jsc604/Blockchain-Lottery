import { useBlockNumber, useContractWrite } from "wagmi"
import * as lotteryJson from '../../assets/Lottery.json';
import { Button, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { alchemyProvider } from '@wagmi/core/providers/alchemy'
import { ethers } from "ethers";

export default function OpenBets() {
  const [duration, setDuration] = useState<string>();

  const { isSuccess, isLoading, write } = useContractWrite({
    address: import.meta.env.VITE_LOTTERY_ADDRESS,
    abi: lotteryJson.abi,
    functionName: 'openBets',
  });

  const handleOpenBets = async () => {
    const provider = new ethers.providers.JsonRpcProvider(import.meta.env.VITE_GOERLI_URL);
    const currentBlock = await provider.getBlock("latest");
    write({ args: [currentBlock.timestamp + Number(duration)] });
  }

  { isLoading && <Spinner /> }
  { isSuccess && <Text>Bets Open</Text> }

  return (
    <>
      <NumberInput defaultValue={''} precision={0} step={1} min={0} value={duration} onChange={(value) => setDuration(value)} placeholder="Duration (seconds)">
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Button colorScheme="blue" onClick={handleOpenBets}>Open Bets</Button>
    </>
  )
}

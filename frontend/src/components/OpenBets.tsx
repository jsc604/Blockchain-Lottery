import { useAccount, useContractRead, useContractWrite, useWaitForTransaction } from "wagmi"
import * as lotteryJson from '../../assets/Lottery.json';
import { Box, Button, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Spinner, Text } from "@chakra-ui/react";
import { useState } from "react";
import { ethers } from "ethers";

export default function OpenBets() {
  const [duration, setDuration] = useState<string>();

  const { write, data } = useContractWrite({
    address: import.meta.env.VITE_LOTTERY_ADDRESS,
    abi: lotteryJson.abi,
    functionName: 'openBets',
  })

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
  })

  const handleOpenBets = async () => {
    const provider = new ethers.providers.JsonRpcProvider(import.meta.env.VITE_GOERLI_URL);
    const currentBlock = await provider.getBlock("latest");
    write({ args: [currentBlock.timestamp + Number(duration)] });
  }

  const getOwner = () => {
    const { address } = useAccount()
    const { data } = useContractRead({
      address: import.meta.env.VITE_LOTTERY_ADDRESS,
      abi: lotteryJson.abi,
      functionName: 'owner',
    })
    return (data == address) ? true : false;
  };

  const isOwner = getOwner();

  return (
    <>
      {isOwner ?
        <Box maxWidth={350} width={'80%'} display={'flex'} flexDirection={'column'}>
          <NumberInput backgroundColor={'white'} rounded={'md'} color={'black'} defaultValue={''} precision={0} step={1} min={0} value={duration} onChange={(value) => setDuration(value)} >
            <NumberInputField placeholder="Duration (seconds)" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Button
            colorScheme="green"
            onClick={handleOpenBets}
            isLoading={isLoading}
            loadingText='Opening Bets...'
            marginY={4}
            backgroundColor={'#85be00'}
          >
            Open Bets
          </Button>
        </Box>
        :
        null
      }
    </>
  )
}

import { Heading, Button, Box, Text, Alert, AlertDescription, AlertIcon, AlertTitle, CloseButton } from "@chakra-ui/react";
import { useAccount, useContractRead, useContractWrite, useWaitForTransaction } from "wagmi";
import * as lotteryJson from '../../assets/Lottery.json';
import { ethers } from "ethers";
import { useState } from "react";

interface PageProps {
  prize?: string;
}

export default function ClaimPrize({ prize }: PageProps) {
  const { address } = useAccount();
  const [successMessage, setSuccessMessage] = useState(false);

  const { data: prizeAmount } = useContractRead({
    address: import.meta.env.VITE_LOTTERY_ADDRESS,
    abi: lotteryJson.abi,
    functionName: 'prize',
    args: [address],
  })

  const { write, data: writeData } = useContractWrite({
    address: import.meta.env.VITE_LOTTERY_ADDRESS,
    abi: lotteryJson.abi,
    functionName: 'prizeWithdraw',
  });

  const { isLoading } = useWaitForTransaction({
    hash: writeData?.hash,
    onSuccess() {
      setSuccessMessage(true);
    }
  })

  return (
    <Box maxWidth={350} width={'80%'} display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
      <Heading>Claim Prize</Heading>
      <Text marginY={4} fontSize={'xl'}>
        If you won something, Congratulations!
        <br />
        If not, there's always next time!
      </Text>
      {successMessage &&
        <Alert status='success' backgroundColor={'green.400'} borderRadius={8}>
          <AlertIcon color={'green.700'} />
          <Box margin={'auto'} fontSize={'xl'}>
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>
              You claimed {ethers.utils.formatEther(prizeAmount as ethers.BigNumber)} LT0!
            </AlertDescription>
          </Box>
          <CloseButton
            alignSelf='flex-start'
            position='relative'
            right={-1}
            top={-1}
            onClick={() => setSuccessMessage(false)}
          />
        </Alert>
      }
      {Number(prize) > 0 && (
        <Button
          colorScheme='green'
          backgroundColor={'#85be00'}
          marginY={4}
          onClick={() => prizeAmount && write({ args: [ethers.utils.parseEther(ethers.utils.formatEther(prizeAmount as ethers.BigNumber))] })}
          isLoading={isLoading}
          loadingText='Claiming ...'
        >
          Claim
        </Button>
      )}
    </Box>
  )
}

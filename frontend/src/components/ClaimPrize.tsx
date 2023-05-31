import { Heading, Button, Box, Text, Alert, AlertDescription, AlertIcon, AlertTitle, CloseButton, useDisclosure } from "@chakra-ui/react";
import { useAccount, useContractRead, useContractWrite, useWaitForTransaction } from "wagmi";
import * as lotteryJson from '../../assets/Lottery.json';
import { formatEther, parseEther } from "ethers/src.ts/utils";
import { BigNumber } from "ethers";
import { useState } from "react";

interface pageProps {
  prize?: string;
}

export default function ClaimPrize({ prize }: pageProps) {
  const { address } = useAccount();
  const [successMessage, setSuccessMessage] = useState(false);

  const { data: prizeAmount } = useContractRead({
    address: import.meta.env.VITE_LOTTERY_ADDRESS,
    abi: lotteryJson.abi,
    functionName: 'prize',
    args: [address],
  })

  const { write, data: withdrawData, isSuccess } = useContractWrite({
    address: import.meta.env.VITE_LOTTERY_ADDRESS,
    abi: lotteryJson.abi,
    functionName: 'prizeWithdraw',
    args: [parseEther(formatEther(prizeAmount as BigNumber))],
  });

  const { isLoading } = useWaitForTransaction({
    hash: withdrawData?.hash,
    onSuccess() {
      setSuccessMessage(true);
    }
  })

  const claimButton = () => {
    if (Number(prize) > 0) {
      return (
        <Button
          colorScheme='linkedin'
          onClick={() => write()}
          isLoading={isLoading}
          loadingText='Claiming ...'
        >
          Claim
        </Button>
      )
    }
  }

  return (
    <Box maxWidth={350} width={'80%'} display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
      <Heading>Claim Prize</Heading>
      <Text marginY={8} fontSize={'xl'}>
        If you won something, Congratulations!
        <br />
        If not, theres always next time!
      </Text>
      {successMessage &&
        <Alert status='success'>
          <AlertIcon />
          <Box margin={'auto'} fontSize={'xl'}>
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>
              You claimed {formatEther(prizeAmount as BigNumber)} LT0!
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
      {!isSuccess && claimButton()}
      {isLoading &&
        <Button
          colorScheme='linkedin'
          onClick={() => write()}
          isLoading={isLoading}
          loadingText='Claiming ...'
        >
          Claim
        </Button>
      }
    </Box>
  )
}

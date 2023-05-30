import { Heading, Button, Box, Text, Alert, AlertDescription, AlertIcon, AlertTitle } from "@chakra-ui/react";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import * as lotteryJson from '../../assets/Lottery.json';
import { formatEther, parseEther } from "ethers/src.ts/utils";
import { BigNumber } from "ethers";

interface pageProps {
  prize?: string;
}

export default function ClaimPrize({ prize }: pageProps) {
  const { address } = useAccount();
  const { data } = useContractRead({
    address: import.meta.env.VITE_LOTTERY_ADDRESS,
    abi: lotteryJson.abi,
    functionName: 'prize',
    args: [address],
  })

  const { write, isLoading, isSuccess } = useContractWrite({
    address: import.meta.env.VITE_LOTTERY_ADDRESS,
    abi: lotteryJson.abi,
    functionName: 'prizeWithdraw',
    args: [parseEther(formatEther(data as BigNumber))],
  });

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
    <Box width={'fit-content'}>
      <Heading>Claim Prize</Heading>
      <Text marginY={8} fontSize={'xl'}>
        If you won something, Congratulations!
        <br />
        If not, theres always next time!
      </Text>
      {isSuccess &&
        <Alert status='success'>
          <AlertIcon />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            {`You claimed ${formatEther(data as BigNumber)} LT0 tokens!`}
          </AlertDescription>
        </Alert>
      }
      {!isSuccess && claimButton()}
    </Box>
  )
}

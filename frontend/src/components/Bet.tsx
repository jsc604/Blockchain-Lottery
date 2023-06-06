import { useState } from 'react';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, CloseButton, Heading, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text, useDisclosure } from '@chakra-ui/react';
import * as tokenJson from '../../assets/LotteryToken.json';
import * as lotteryJson from '../../assets/Lottery.json';
import { ethers } from 'ethers';

const Bet = () => {
  const [amount, setAmount] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const { write: writeApprove, data: approveData } = useContractWrite({
    address: import.meta.env.VITE_TOKEN_ADDRESS,
    abi: tokenJson.abi,
    functionName: 'approve',
    args: [import.meta.env.VITE_LOTTERY_ADDRESS, ethers.constants.MaxUint256],
  })

  const { write: writeBet, data: betData, isLoading: betIsLoading } = useContractWrite({
    address: import.meta.env.VITE_LOTTERY_ADDRESS,
    abi: lotteryJson.abi,
    functionName: 'betMany',
    onError() {
      setErrorMessage(true);
    },
  });

  const { isLoading: approveIsLoading } = useWaitForTransaction({
    hash: approveData?.hash,
    onSuccess() {
      writeBet({ args: [amount] });
    }
  })

  const { isLoading: betIsConfirming } = useWaitForTransaction({
    hash: betData?.hash,
    onSuccess() {
      setSuccessMessage(true);
    },
  })

  return (
    <Box maxWidth={350} width={'80%'} display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>

      <Heading marginY={10}>Bet Tokens</Heading>

      <Text marginBottom={4} fontSize={'xl'}>Enter the amount of tokens you wish to bet</Text>

      {successMessage &&
        <Alert status='success' backgroundColor={'green.400'} borderRadius={8}>
          <AlertIcon color={'green.700'} />
          <Box margin={'auto'} fontSize={'xl'}>
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>
              You Bet {amount} LT0!
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
      {errorMessage &&
        <Alert status='error' backgroundColor={'red.400'} borderRadius={8}>
          <AlertIcon color={'red.600'} />
          <Box margin={'auto'} fontSize={'xl'}>
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription>
              Insufficient Allowance
            </AlertDescription>
          </Box>
          <CloseButton
            alignSelf='flex-start'
            position='relative'
            right={-1}
            top={-1}
            onClick={() => setErrorMessage(false)}
          />
        </Alert>
      }

      <NumberInput backgroundColor={'white'} rounded={'md'} color={'black'} defaultValue={0} precision={0} step={1} min={0} value={amount} onChange={(value) => setAmount(value)} marginY={4}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>

      <Button
        onClick={() => writeApprove()}
        colorScheme='green'
        backgroundColor={'#85be00'}
        isLoading={approveIsLoading || betIsLoading || betIsConfirming}
        loadingText={(approveIsLoading && 'Approving Bet...') || (betIsLoading && 'Approved... Confirm Bet') || (betIsConfirming && 'Betting Tokens...')}
      >
        Bet Tokens
      </Button>

    </Box>
  );
};

export default Bet;
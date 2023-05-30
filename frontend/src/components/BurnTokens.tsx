import { useState } from 'react';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, CloseButton, Heading, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text, useDisclosure } from '@chakra-ui/react';
import * as lotteryJson from '../../assets/Lottery.json';
import * as tokenJson from '../../assets/LotteryToken.json';
import { parseEther } from 'ethers/src.ts/utils';
import { ethers } from 'ethers';
import LotteryTokenBalance from './LotteryTokenBalance';

const BurnTokens = () => {
  const [amount, setAmount] = useState('');

  const { write: writeApprove, data: approveData } = useContractWrite({
    address: import.meta.env.VITE_TOKEN_ADDRESS,
    abi: tokenJson.abi,
    functionName: 'approve',
    args: [import.meta.env.VITE_LOTTERY_ADDRESS, ethers.constants.MaxUint256],
  });

  const { write: writeBurn, data: burnData, isLoading: burning } = useContractWrite({
    address: import.meta.env.VITE_LOTTERY_ADDRESS,
    abi: lotteryJson.abi,
    functionName: 'returnTokens',
  });

  const { isLoading: approveIsLoading } = useWaitForTransaction({
    hash: approveData?.hash,
    onSuccess() {
      writeBurn({ args: [parseEther(amount)] });
    }
  })

  const { isSuccess: burnIsSuccess, isLoading: burnIsLoading } = useWaitForTransaction({
    hash: burnData?.hash,
  })

  const {
    isOpen: isVisible,
    onClose,
  } = useDisclosure({ defaultIsOpen: true })

  return (
    <Box maxWidth={350} width={'80%'} display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
      <Heading>Burn Tokens</Heading>

      <Box marginY={4} fontSize={'xl'}>
        Your token balance -
        <LotteryTokenBalance />
      </Box>

      <Text fontSize={'xl'}>Enter the amount you wish to burn</Text>

      {burnIsSuccess && isVisible &&
        <Alert status='success'>
          <AlertIcon />
          <Box>
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>
              {`You burned ${amount} LT0!`}
            </AlertDescription>
          </Box>
          <CloseButton
            alignSelf='flex-start'
            position='relative'
            right={-1}
            top={-1}
            onClick={onClose}
          />
        </Alert>
      }

      <NumberInput defaultValue={0} precision={0} step={1} min={0} value={amount} onChange={(value) => setAmount(value)} marginY={4}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>

      <Button
        onClick={() => writeApprove()}
        colorScheme='orange'
        isLoading={approveIsLoading || burnIsLoading || burning}
        loadingText={approveIsLoading || burning ? 'Approving Tokens' : 'Burning Tokens'}
      >
        Burn Tokens
      </Button>

    </Box>
  );
};


export default BurnTokens;
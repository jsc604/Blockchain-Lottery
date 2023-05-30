import { useState } from 'react';
import { useContractWrite } from 'wagmi';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, CloseButton, Heading, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text, useDisclosure } from '@chakra-ui/react';
import * as tokenJson from '../../assets/LotteryToken.json';
import * as lotteryJson from '../../assets/Lottery.json';
import { ethers } from 'ethers';

const Bet = () => {
  const [amount, setAmount] = useState('');

  const { isSuccess: approveIsSuccess, write: writeApprove, data: approveHash } = useContractWrite({
    address: import.meta.env.VITE_TOKEN_ADDRESS,
    abi: tokenJson.abi,
    functionName: 'approve',
    args: [import.meta.env.VITE_LOTTERY_ADDRESS, ethers.constants.MaxUint256],
  })

  const { isSuccess: betIsSuccess, write: writeBet, data: betHash } = useContractWrite({
    address: import.meta.env.VITE_LOTTERY_ADDRESS,
    abi: lotteryJson.abi,
    functionName: 'betMany',
    args: [amount],
  });

  const handleApprove = () => {
    writeApprove();
  }

  const handleBet = () => {
    writeBet()
  };

  const {
    isOpen: isVisible,
    onClose,
  } = useDisclosure({ defaultIsOpen: true })

  return (
    <Box maxWidth={350} width={'80%'} display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
      
      <Heading marginY={10}>Bet Tokens</Heading>
      
      <Text marginBottom={4} fontSize={'xl'}>Enter the amount of tokens you wish to bet</Text>

      <NumberInput defaultValue={0} precision={0} step={1} min={0} value={amount} onChange={(value) => setAmount(value)}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>

      {approveIsSuccess && approveHash?.hash ?
        <Button
          onClick={handleBet}
          colorScheme='green'
          marginY={4}
        >
          Bet Tokens
        </Button>
        :
        <Button
          onClick={handleApprove}
          colorScheme='green'
          marginY={4}
        >
          Approve Tokens
        </Button>
      }

      {betIsSuccess && betHash?.hash && isVisible &&
        <Alert status='success'>
          <AlertIcon />
          <Box>
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>
              {`You Bet ${amount} LT0!`}
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
    </Box>
  );
};

export default Bet;
import { useState } from 'react';
import { useContractWrite } from 'wagmi';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, CloseButton, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, useDisclosure } from '@chakra-ui/react';
import * as tokenJson from '../../assets/Lottery.json';
import { parseEther } from 'ethers/src.ts/utils';
import { ethers } from 'ethers';

const ReturnTokens = () => {
  const [amount, setAmount] = useState('');

  const { isSuccess, write } = useContractWrite({
    address: import.meta.env.VITE_LOTTERY_ADDRESS,
    abi: tokenJson.abi,
    functionName: 'returnTokens',
  });

  const {
    isOpen: isVisible,
    onClose,
  } = useDisclosure({ defaultIsOpen: true })


  return (
    <Box>
      <NumberInput defaultValue={0} precision={0} step={1} min={0} value={amount} onChange={(value) => setAmount(value)}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>

      <Button onClick={() => write({ args: [ethers.utils.parseEther(amount)]})} colorScheme='green'>Return Tokens</Button>

      {isSuccess && isVisible &&
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


export default ReturnTokens;
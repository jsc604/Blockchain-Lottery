import { useState } from 'react';
import { useContractWrite,useContractRead } from 'wagmi';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, CloseButton, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, useDisclosure } from '@chakra-ui/react';
import * as tokenJson from '../../assets/Lottery.json';
import { parseEther } from 'ethers/src.ts/utils';
import { ethers } from 'ethers';

const CloseLottery = () => {
  const [amount, setAmount] = useState('');

  const { isSuccess, write } = useContractWrite({
    address: import.meta.env.VITE_LOTTERY_ADDRESS,
    abi: tokenJson.abi,
    functionName: 'closeLottery',
  });

  const {
    isOpen: isVisible,
    onClose,
  } = useDisclosure({ defaultIsOpen: true })

  return (
    <Box>
      <Button onClick={() => write()} colorScheme='green'>Close Lottery</Button>

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

export default CloseLottery;
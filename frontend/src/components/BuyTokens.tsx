import { useState } from 'react';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, CloseButton, Heading, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text, useDisclosure } from '@chakra-ui/react';
import * as tokenJson from '../../assets/Lottery.json';
import { parseEther } from 'ethers/src.ts/utils';
import { ethers } from 'ethers';

const BuyTokens = () => {
  const [amount, setAmount] = useState('');

  const { write, data } = useContractWrite({
    address: import.meta.env.VITE_LOTTERY_ADDRESS,
    abi: tokenJson.abi,
    functionName: 'purchaseTokens',
  });

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash
  })

  const {
    isOpen: isVisible,
    onClose,
  } = useDisclosure({ defaultIsOpen: true })

  return (
    <Box maxWidth={350} width={'80%'} display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>

      <Heading marginY={10}>Buy Tokens</Heading>

      <Text marginBottom={4} fontSize={'xl'}>Enter the amount of tokens you wish to buy</Text>
      
      {isSuccess && isVisible &&
        <Alert status='success'>
          <AlertIcon />
          <Box margin={'auto'} fontSize={'xl'}>
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>
              {`You purchased ${amount} LT0!`}
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
        onClick={() => write({ value: BigInt(ethers.BigNumber.from(parseEther(amount)).toString()) / 1000n })}
        colorScheme='green'
        isLoading={isLoading}
        loadingText='Buying Tokens...'
      >
        Buy Tokens
      </Button>
    </Box>
  );
};

export default BuyTokens;
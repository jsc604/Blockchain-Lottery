import { useState } from 'react';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, CloseButton, Heading, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text, useDisclosure } from '@chakra-ui/react';
import * as tokenJson from '../../assets/Lottery.json';
import { ethers } from 'ethers';

const BuyTokens = () => {
  const [amount, setAmount] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);

  const { write, data } = useContractWrite({
    address: import.meta.env.VITE_LOTTERY_ADDRESS,
    abi: tokenJson.abi,
    functionName: 'purchaseTokens',
  });

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess() {
      setSuccessMessage(true);
    }
  })

  return (
    <Box maxWidth={350} width={'80%'} display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>

      <Heading marginY={10}>Buy Tokens</Heading>

      <Text marginBottom={4} fontSize={'xl'}>Enter the amount of tokens you wish to buy</Text>
      
      {successMessage &&
        <Alert status='success' backgroundColor={'green.400'} borderRadius={8}>
          <AlertIcon color={'green.700'}/>
          <Box margin={'auto'} fontSize={'xl'}>
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>
              You purchased {amount} LT0!
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

      <NumberInput backgroundColor={'white'} rounded={'md'} color={'black'} defaultValue={0} precision={0} step={1} min={0} value={amount} onChange={(value) => setAmount(value)} marginY={4}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>

      <Button
        onClick={() => write({ value: BigInt(ethers.BigNumber.from(ethers.utils.parseEther(amount)).toString()) / 1000n })}
        colorScheme='green'
        backgroundColor={'#85be00'}
        isLoading={isLoading}
        loadingText='Buying Tokens...'
      >
        Buy Tokens
      </Button>
    </Box>
  );
};

export default BuyTokens;
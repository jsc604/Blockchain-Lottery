import { useContractWrite, useContractRead, useAccount } from 'wagmi';
import { Box, Button, Heading, Text } from '@chakra-ui/react';
import * as lotteryJson from '../../assets/Lottery.json';
import { formatEther } from 'ethers/src.ts/utils';
import { BigNumber } from 'ethers';

const OwnerWithdraw = () => {

  const { data: ownerPoolData, isSuccess: ownerPoolIsSuccess } = useContractRead({
    address: import.meta.env.VITE_LOTTERY_ADDRESS,
    abi: lotteryJson.abi,
    functionName: 'ownerPool',
    watch: true,
  })

  const { write } = useContractWrite({
    address: import.meta.env.VITE_LOTTERY_ADDRESS,
    abi: lotteryJson.abi,
    functionName: 'ownerWithdraw',
    args: [(ownerPoolData)],
  });

  const getOwner = () => {
    const { address } = useAccount()
    const { data: ownerAddress } = useContractRead({
      address: import.meta.env.VITE_LOTTERY_ADDRESS,
      abi: lotteryJson.abi,
      functionName: 'owner',
    })
    return (ownerAddress == address) ? true : false;
  };

  const isOwner = getOwner();

  return (
    <Box width={'fit-content'}>

      <Heading>Owner Pool</Heading>
      
      {ownerPoolIsSuccess &&
        <Text marginY={8}>{`The owner pool has accumulated ${formatEther(ownerPoolData as BigNumber)} LT0 tokens`}</Text>
      }

      {isOwner &&
        <Button onClick={() => write()} colorScheme='green'>Withdraw From Owner Pool</Button>
      }

    </Box>
  );
};

export default OwnerWithdraw;
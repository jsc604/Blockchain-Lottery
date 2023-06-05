import { useContractWrite, useContractRead, useAccount, useWaitForTransaction } from 'wagmi';
import { Box, Button, Heading, Text, Tooltip } from '@chakra-ui/react';
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

  const { write, data } = useContractWrite({
    address: import.meta.env.VITE_LOTTERY_ADDRESS,
    abi: lotteryJson.abi,
    functionName: 'ownerWithdraw',
    args: [(ownerPoolData)],
  });

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
  })

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
    <Box maxWidth={350} width={'80%'} display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>

      <Heading>Owner Pool</Heading>

      {ownerPoolIsSuccess &&
        <Text marginY={8} fontSize={'xl'}>The owner pool has accumulated {formatEther(ownerPoolData as BigNumber)} LT0 tokens</Text>
      }

      {isOwner ?
        <Button
          onClick={() => write()}
          colorScheme='green'
          backgroundColor={'#85be00'}
          isLoading={isLoading}
          loadingText='Withdrawing...'
        >
          Owner Withdraw
        </Button>
        :
        <Tooltip label='You are not the owner of this contract' hasArrow bg={'orange.500'}>
          <Button colorScheme='green' isDisabled>Owner Withdraw</Button>
        </Tooltip>
      }
    </Box>
  );
};

export default OwnerWithdraw;
import { useAccount } from 'wagmi'
import { Connect } from './components/Connect'
import { Box, Center, Heading, SimpleGrid } from '@chakra-ui/react'
import BuyTokens from './components/BuyTokens'
import PrizePool from './components/PrizePool'
import BetsToggle from './components/BetsToggle'
import LotteryStatus from './components/LotteryStatus'
import Bet from './components/Bet'
import PrizeWithdraw from './components/PrizeWithdraw'
import OwnerWithdraw from './components/OwnerWithdraw'
import BurnTokens from './components/BurnTokens'

export function App() {
  const { isConnected } = useAccount()

  return (
    <>
      <Center>
        <Heading marginY={4} size={'2xl'}>Lottery DApp</Heading>
      </Center>
      <br />
      <Box display={'flex'} justifyContent={'space-between'} width={'80%'} marginX={'auto'} alignItems={'center'}>
        <Box>
          {isConnected &&
            <>
              <BetsToggle />
              <LotteryStatus />
            </>
          }
        </Box>
        <Connect />
      </Box>
      {isConnected && (
        <>
          <br />
          <Center display={'flex'} flexDirection={'column'}>
            <PrizePool />
          </Center>
          <br />

          <br />
          <hr />
          <SimpleGrid columns={2} spacing={10} width={'70%'} marginX={'auto'} textAlign={'center'} justifyItems={'center'} marginBottom={10}>
            <BuyTokens />
            <Bet />
          </SimpleGrid>
          <hr />
          <br />

          <PrizeWithdraw />

          <br />
          <hr />

          <br />
          <SimpleGrid columns={2} spacing={10} width={'70%'} marginX={'auto'} textAlign={'center'} justifyItems={'center'} marginY={10}>
            <OwnerWithdraw />
            <BurnTokens />
          </SimpleGrid>
          <br />
        </>
      )}
    </>
  )
}

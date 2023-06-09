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
import Home from './components/Home'

export function App() {
  const { isConnected } = useAccount()

  return (
    <Box bgGradient='linear(to-b, #0081bd, #00c7ea)' textColor={'white'} minHeight={'100vh'}>
      <Center>
        <Heading marginY={4} size={{base: '2xl', md: '3xl'}} textAlign={'center'}>Blockchain Lottery</Heading>
      </Center>

      <Box display={'flex'} justifyContent={'space-between'} flexDirection={{base: 'column-reverse', md: 'row'}} width={'80%'} marginX={'auto'} alignItems={'center'}>
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

      {!isConnected && <Home />}

      {isConnected && (
        <>
          <Center display={'flex'} flexDirection={'column'}>
            <PrizePool />
          </Center>
          <br />

          <br />
          <hr />
          <SimpleGrid columns={{base: 1, md: 2}} spacing={10} width={'70%'} marginX={'auto'} textAlign={'center'} justifyItems={'center'} marginBottom={10}>
            <BuyTokens />
            <Bet />
          </SimpleGrid>
          <hr />
          <br />

          <PrizeWithdraw />

          <br />
          <hr />

          <br />
          <SimpleGrid columns={{base: 1, md: 2}} spacing={10} width={'70%'} marginX={'auto'} textAlign={'center'} justifyItems={'center'} marginY={10}>
            <OwnerWithdraw />
            <BurnTokens />
          </SimpleGrid>
          <br />
        </>
      )}
    </Box>
  )
}

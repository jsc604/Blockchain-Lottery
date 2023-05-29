import { useAccount } from 'wagmi'

import { Connect } from './components/Connect'
import { ReadContracts } from './components/ReadContracts'
import { ReadContractsInfinite } from './components/ReadContractsInfinite'
import { SendTransaction } from './components/SendTransaction'
import { SendTransactionPrepared } from './components/SendTransactionPrepared'
import { SignMessage } from './components/SignMessage'
import { SignTypedData } from './components/SignTypedData'
import { Token } from './components/Token'
import { WatchContractEvents } from './components/WatchContractEvents'
import { WatchPendingTransactions } from './components/WatchPendingTransactions'
import { WriteContract } from './components/WriteContract'
import { WriteContractPrepared } from './components/WriteContractPrepared'
import { Box, Center, Heading } from '@chakra-ui/react'
import CheckState from './components/CheckState'
import BuyTokens from './components/BuyTokens'
import PrizePool from './components/PrizePool'
import OpenBets from './components/OpenBets'

export function App() {
  const { isConnected } = useAccount()

  return (
    <>
      <Center>
        <Heading marginY={4} size={'2xl'}>Lottery dApp</Heading>
      </Center>

      <Box display={'flex'} justifyContent={'space-between'} width={'80%'} marginX={'auto'} alignItems={'center'}>
        <Box>
        <OpenBets />
        <CheckState />
        </Box>
        <Connect />
      </Box>
      
      <br />
      

      {isConnected && (
        <>
      <Center>
        <PrizePool />
      </Center>
          <br />
          <hr />
          <BuyTokens />
          <br />
          {/* <hr />
          <h2>Read Contracts Infinite</h2>
          <ReadContractsInfinite />
          <br />
          <hr />
          <h2>Send Transaction</h2>
          <SendTransaction />
          <br />
          <hr />
          <h2>Send Transaction (Prepared)</h2>
          <SendTransactionPrepared />
          <br />
          <hr />
          <h2>Sign Message</h2>
          <SignMessage />
          <br />
          <hr />
          <h2>Sign Typed Data</h2>
          <SignTypedData />
          <br />
          <hr />
          <h2>Token</h2>
          <Token />
          <br />
          <hr />
          <h2>Watch Contract Events</h2>
          <WatchContractEvents />
          <br />
          <hr />
          <h2>Watch Pending Transactions</h2>
          <WatchPendingTransactions />
          <br />
          <hr />
          <h2>Write Contract</h2>
          <WriteContract />
          <br />
          <hr />
          <h2>Write Contract (Prepared)</h2>
          <WriteContractPrepared /> */}
        </>
      )}
    </>
  )
}

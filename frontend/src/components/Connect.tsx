import { Box, Button } from '@chakra-ui/react'
import { BaseError } from 'viem'
import { useAccount, useConnect, useDisconnect, useNetwork } from 'wagmi'
import { EthBalance } from './EthBalance'
import LotteryTokenBalance from './LotteryTokenBalance'

export function Connect() {
  const { connector, isConnected } = useAccount()
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()
  const { disconnect } = useDisconnect()
  const { chain } = useNetwork()

  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
      <Box>
        {isConnected && (
          <Button onClick={() => disconnect()} colorScheme='green'>
            Disconnect from {connector?.name}
          </Button>
        )}

        {connectors
          .filter((x) => x.ready && x.id !== connector?.id)
          .map((x) => (
            <Button
              key={x.id}
              onClick={() => connect({ connector: x })}
              colorScheme='green'
              isLoading={isLoading && x.id === pendingConnector?.id}
              loadingText='connecting'
            >
              Connect {x.name}
            </Button>
          ))}
      </Box>
      {isConnected &&
        <Box>
          Connected to {chain?.name ?? chain?.id}
          {chain?.unsupported && ' (unsupported)'}
          <EthBalance />
          <LotteryTokenBalance />
        </Box>
      }

      {error && <Box>{(error as BaseError).shortMessage}</Box>}
    </Box>
  )
}

import { configureChains, createConfig } from 'wagmi'
import { mainnet, goerli } from '@wagmi/core/chains'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { alchemyProvider } from '@wagmi/core/providers/alchemy'

const apiKey: string = import.meta.env.VITE_ALCHEMY_API_KEY || '';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, goerli],
  [
    alchemyProvider({ apiKey }),
  ],
)

export const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
  ],
  publicClient,
  webSocketPublicClient,
})

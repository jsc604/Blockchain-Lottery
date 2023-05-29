import { useAccount, useBalance } from 'wagmi'

export function EthBalance() {
  const { address } = useAccount()
  const { data } = useBalance({
    address,
    watch: true,
  })

  return (
    <div>
      ETH: {data?.formatted}
    </div>
  )
}

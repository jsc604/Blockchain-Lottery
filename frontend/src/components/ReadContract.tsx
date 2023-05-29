import { useState } from 'react'
import { BaseError } from 'viem'
import { type Address, useContractRead } from 'wagmi'

import { wagmiContractConfig } from './contracts'

export function ReadContract() {
  return (
    <div>
      <BalanceOf />
    </div>
  )
}


function BalanceOf() {
  const [address, setAddress] = useState<Address>(
    '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
  )
  const { data, error, isLoading, isSuccess } = useContractRead({
    ...wagmiContractConfig,
    functionName: 'balanceOf',
    args: [address],
    enabled: Boolean(address),
  })

  const [value, setValue] = useState<string>(address)

  return (
    <div>
      Token balance: {isSuccess && data?.toString()}
      <input
        onChange={(e) => setValue(e.target.value)}
        placeholder="wallet address"
        style={{ marginLeft: 4 }}
        value={value}
      />
      <button onClick={() => setAddress(value as Address)}>
        {isLoading ? 'fetching...' : 'fetch'}
      </button>
      {error && <div>{(error as BaseError).shortMessage}</div>}
    </div>
  )
}

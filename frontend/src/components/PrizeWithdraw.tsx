import { SimpleGrid } from '@chakra-ui/react'
import { useState } from 'react'
import CheckPrize from './CheckPrize'
import DisplayPrize from './DisplayPrize'
import ClaimPrize from './ClaimPrize';

export default function PrizeWithdraw() {
  const [prize, setPrize] = useState('');

  return (
    <SimpleGrid columns={3} spacing={10} width={'80%'} margin={'auto'} justifyItems={'center'} textAlign={'center'} marginY={10} alignItems={'center'}>
      <CheckPrize setPrize={setPrize} />
      <DisplayPrize prize={prize} />
      {/* <ClaimPrize prize={prize} /> */}
    </SimpleGrid>
  )
}

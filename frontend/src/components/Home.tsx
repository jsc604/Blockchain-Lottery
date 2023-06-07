import { Box, Center, Heading, Image } from '@chakra-ui/react'

export default function Home() {
  return (
    <Center flexDirection={'column'}>
      <br />
      <Heading>Welcome to the exciting world of Blockchain Lottery!</Heading>
      <Image
        src='https://images.unsplash.com/photo-1640833906651-6bd1af7aeea3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1744&q=80'
        alt='slots'
        height={'50vh'}
        width={'100vw'}
        marginY={8}
        objectFit={'cover'}
      />
      <Heading>Test your luck and win BIG!</Heading>
      <Box fontSize={'xl'} color={'blue.700'}>Connect your wallet to get started</Box>
    </Center>
  )
}

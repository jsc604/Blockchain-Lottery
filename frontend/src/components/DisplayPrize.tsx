import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@chakra-ui/react";

interface pageProps {
  prize?: string;
}

export default function DisplayPrize({ prize }: pageProps) {

  if (prize === '') {
    return (
      <Alert
        status='info'
        backgroundColor={'whiteAlpha.400'}
        borderRadius={8}
        variant='subtle'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        textAlign='center'
        height='200px'
      >
        <AlertIcon boxSize='40px' mr={0} />
        <AlertTitle mt={4} mb={1} fontSize='xl'>
          Did you win Anon?
        </AlertTitle>
        <AlertDescription maxWidth='sm'>
          Click the button on the left to check if you have won a previous lottery!
        </AlertDescription>
      </Alert>
    )
  } else if (Number(prize) > 0) {
    return (
      <Alert
        status='success'
        backgroundColor={'green.400'}
        borderRadius={8}
        variant='subtle'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        textAlign='center'
        height='200px'
      >
        <AlertIcon boxSize='40px' mr={0} color={'green.700'} />
        <AlertTitle mt={4} mb={1} fontSize='xl'>
          Congratulations Anon!
        </AlertTitle>
        <AlertDescription maxWidth='sm'>
          {`You have won ${prize} LT0 tokens.`}
          <br />
          Claim your prize now!
        </AlertDescription>
      </Alert>
    )
  } else {
    return (
      <Alert
        status='error'
        backgroundColor={'red.400'}
        borderRadius={8}
        variant='subtle'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        textAlign='center'
        height='200px'
      >
        <AlertIcon boxSize='40px' mr={0} color={'red.600'} />
        <AlertTitle mt={4} mb={1} fontSize='xl'>
          Sorry Anon!
        </AlertTitle>
        <AlertDescription maxWidth='sm'>
          You don&apos;t have any prize to claim.
          <br />
          Better luck next time!
        </AlertDescription>
      </Alert>
    )
  }
}

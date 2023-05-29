import { Heading, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function CheckState() {
  const [lotteryState, setLotteryState] = useState();
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3000/state')
    .then(response => {
        setLotteryState(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  });

  { isloading && <Spinner /> }

  return (
    <Heading>{lotteryState}</Heading>
  )
}

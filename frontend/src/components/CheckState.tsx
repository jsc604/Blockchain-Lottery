import { Heading, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';

export default function CheckState() {
  const [lotteryState, setLotteryState] = useState();
  const [isloading, setIsLoading] = useState(true);

  const { data } = useContractRead({ watch: true });

  useEffect(() => {
    axios.get('http://localhost:3000/state')
      .then(response => {
        setLotteryState(response.data);
        setIsLoading(false);
        console.log('watching');
      })
      .catch(error => {
        console.error(error);
      });
  }, [data]);

  { isloading && <Spinner /> }

  return (
    <Heading>{lotteryState}</Heading>
  )
}


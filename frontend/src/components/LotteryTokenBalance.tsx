import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Spinner } from '@chakra-ui/react';
import { useAccount } from 'wagmi';

export default function LotteryTokenBalance() {
  const [balance, setBalance] = useState();
  const { address } = useAccount();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/token-balance/${address}`);
        setBalance(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching token balance:', error);
      }
    };

    fetchBalance();
  }, [address]);

  { loading && <Spinner /> }

  return (
    <Box>
      LT0: {balance}
    </Box>
  );
};

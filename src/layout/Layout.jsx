import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';

export default function Layout() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
      // Simulasikan proses memuat data
        await new Promise((resolve) => {
          // eslint-disable-next-line no-promise-executor-return
          setTimeout(() => resolve(), 10);
        });

        setIsLoading(false);
      } catch (error) {
        console.error('Gagal memuat data:', error);
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return <Box>{isLoading ? <Loading /> : <Outlet />}</Box>;
}

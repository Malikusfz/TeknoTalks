import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { MemoryRouter } from 'react-router-dom';
import HeaderWithNavigation from '../components/Header';

export default {
  title: 'Components/Header',
  component: HeaderWithNavigation,
};

export function Default() {
  const signOut = () => console.log('Signing out...');

  return (
    <ChakraProvider>
      <MemoryRouter>
        <HeaderWithNavigation signOut={signOut} />
      </MemoryRouter>
    </ChakraProvider>
  );
}

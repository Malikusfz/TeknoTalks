import {
  Flex, Heading, Link as ChakraLink, Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import React from 'react';
import HeaderWithNavigation from './Header';

const NotFoundContent = React.memo(() => (
  <Flex
    align="center"
    justify="center"
    direction="column"
    h="100vh"
    textAlign="center"
    p={4}
    bg="gray.100"
  >
    <Heading fontSize="9xl" color="red.500" mb={4} mt={-20}>
      404
    </Heading>
    <Text fontSize="2xl" fontWeight="bold" mb={4}>
      Oops! The page you&apos;re looking for can&apos;t be found.
    </Text>
    <Text fontSize="lg" mb={8}>
      It seems you&apos;ve found yourself off the map. Don&apos;t worry,
      let&apos;s navigate back to the
      {' '}
      <ChakraLink as={Link} to="/" color="purple.500">
        home page
      </ChakraLink>
      {' '}
      and start over.
    </Text>
  </Flex>
));

// Menambahkan displayName ke NotFoundContent
NotFoundContent.displayName = 'NotFoundContent';

export default function NotFound() {
  const signOut = () => console.log('Signing out...'); // Contoh fungsi, sesuaikan dengan logika Anda

  return (
    <>
      <HeaderWithNavigation signOut={signOut} showHamburger={false} />
      <NotFoundContent />
    </>
  );
}

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Flex,
  Heading,
  Icon,
  IconButton,
  Link as ChakraLink,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import {
  IoChatbubblesOutline,
  IoChatbubbleEllipsesOutline,
} from 'react-icons/io5';
import { Link as RouterLink } from 'react-router-dom';
import { MdLogout, MdOutlineLeaderboard } from 'react-icons/md';
import PropTypes from 'prop-types';
import React from 'react';
// Import the LoadingBar component
import { LoadingBar } from 'react-redux-loading-bar';

const NavigationLink = React.memo(({ to, icon, children }) => (
  <Button as={RouterLink} to={to} w="100%" leftIcon={icon}>
    {children}
  </Button>
));

NavigationLink.displayName = 'NavigationLink';

NavigationLink.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired, // Make icon required
  children: PropTypes.node.isRequired,
};

export default function HeaderWithNavigation({ signOut, showHamburger = true }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        as="header"
        align="center"
        justify="flex-start" // Changed to flex-start to align text to the left
        h="4rem"
        bg="#FFE3E1"
        w="100%"
        position="fixed"
        top={0}
        zIndex={200}
        px={4}
      >
        {/* Adjusted LoadingBar to be more visible */}
        <LoadingBar style={{
          backgroundColor: '#FF0000', height: '10px', position: 'absolute', top: 0, left: 0, right: 0, zIndex: 300,
        }}
        />

        <Icon as={IoChatbubbleEllipsesOutline} w={8} h={8} color="#FF9494" />
        <Heading as="h1" fontSize="3xl" ml={2}>
          <ChakraLink as={RouterLink} to="/" color="#FF9494">
            TeknoTalks
          </ChakraLink>
        </Heading>

        {showHamburger && (
          <IconButton
            icon={<HamburgerIcon />}
            onClick={onOpen}
            aria-label="Open menu"
            color="#FF9494"
            zIndex={201} // Ensure button is above the loading bar
            ml="auto" // Added to push the hamburger icon to the right
          />
        )}
      </Flex>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody paddingTop="20">
            <VStack spacing={4}>
              <NavigationLink to="/" icon={<IoChatbubblesOutline />}>
                Thread
              </NavigationLink>
              <NavigationLink to="/leaderboards" icon={<MdOutlineLeaderboard />}>
                Leaderboards
              </NavigationLink>
            </VStack>
          </DrawerBody>
          <DrawerFooter borderTopWidth="1px">
            <Button
              w="100%"
              colorScheme="red"
              variant="solid"
              leftIcon={<MdLogout />}
              onClick={() => signOut()}
            >
              Logout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

HeaderWithNavigation.propTypes = {
  signOut: PropTypes.func.isRequired,
  showHamburger: PropTypes.bool,
};

HeaderWithNavigation.defaultProps = {
  showHamburger: true,
};

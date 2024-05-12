// AddThread.js
import {
  Box, Container, Heading, Flex,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import AddThreadInput from '../components/AddThreadInput';
import ThreadCategory from './ThreadCategory';
import TechThreadCategory from './TechThreadCategory';

function getCategoryInstance(category) {
  if (category === 'tech') {
    return new TechThreadCategory(category);
  }
  return new ThreadCategory(category);
}
function useThreadCreation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createThread = ({ title, body, category }) => {
    const categoryInstance = getCategoryInstance(category);
    categoryInstance.createThread(dispatch, navigate, { title, body });
  };

  return createThread;
}

function AddThread() {
  const createThread = useThreadCreation();

  return (
    <Flex
      as="main"
      w="100%"
      h="100vh"
      py="5rem"
      bg="#FFF5E4"
      justifyContent="center"
      alignItems="center"
    >
      <Container as="section" maxW="5xl">
        <Box as="header">
          <Heading as="h2" fontSize="3xl" color="teal.900" mt="1rem" mb={6}>
            Create a new discussion
          </Heading>
        </Box>
        <AddThreadInput addThread={createThread} />
      </Container>
    </Flex>
  );
}

export default AddThread;

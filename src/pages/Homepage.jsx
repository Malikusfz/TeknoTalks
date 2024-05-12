import {
  Box,
  Container,
  Heading,
  IconButton,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { LuMessageSquarePlus } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import ThreadsList from '../components/ThreadsList';
import asyncPopulateThreadAndUsers from '../states/shared/action';
import {
  asyncNeutralizeThreadVote,
  asyncToggleDownVoteThread,
  asyncToggleUpVoteThread,
} from '../states/threads/action';

function Homepage() {
  const { threads, users, authUser } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateThreadAndUsers());
  }, [dispatch]);

  const threadList = useMemo(
    () => threads.map((thread) => ({
      ...thread,
      user: users.find((user) => user.id === thread.ownerId),
    })),
    [threads, users],
  );

  const voteHandler = (threadId, action) => {
    dispatch(action(threadId));
  };

  return (
    <Box as="main" width="auto" paddingY="5rem" backgroundColor="#FFF5E4">
      <Container as="section" maxWidth="5xl">
        <Box>
          <Heading as="h2" fontSize="3xl" color="teal.900" marginTop="1rem">
            Discussions
          </Heading>
          <ThreadsList
            threads={threadList}
            authUserId={authUser.id}
            upVote={(threadId) => voteHandler(threadId, asyncToggleUpVoteThread)}
            downVote={(threadId) => voteHandler(threadId, asyncToggleDownVoteThread)}
            neutralizeVote={(threadId) => voteHandler(threadId, asyncNeutralizeThreadVote)}
          />
        </Box>
        <ChakraLink as={Link} to="/add" position="fixed" bottom={30} right={30}>
          <IconButton
            isRound
            size="lg"
            aria-label="Add thread"
            colorScheme="pink"
            icon={<LuMessageSquarePlus />}
          />
        </ChakraLink>
      </Container>
    </Box>
  );
}

export default Homepage;

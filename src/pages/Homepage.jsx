import {
  Box,
  Container,
  Heading,
  IconButton,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { LuMessageSquarePlus } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import ThreadsList from '../components/ThreadsList';
import api from '../utils/api';

const fetchThreadsAndUsers = async () => {
  const [threads, users] = await Promise.all([api.seeAllThreads(), api.getAllUsers()]);
  return { threads, users };
};

const toggleUpVoteThread = async (threadId) => {
  await api.upVoteThread(threadId);
};

const toggleDownVoteThread = async (threadId) => {
  await api.downVoteThread(threadId);
};

const neutralizeThreadVote = async (threadId) => {
  await api.neutralizeVoteThread(threadId);
};

function Homepage() {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery('threadsAndUsers', fetchThreadsAndUsers, {
    staleTime: 1000 * 60 * 5, // Cache the data for 5 minutes
  });
  const [localVotes, setLocalVotes] = useState({});

  const upVoteMutation = useMutation(toggleUpVoteThread, {
    onSuccess: () => queryClient.invalidateQueries('threadsAndUsers'),
  });
  const downVoteMutation = useMutation(toggleDownVoteThread, {
    onSuccess: () => queryClient.invalidateQueries('threadsAndUsers'),
  });
  const neutralizeVoteMutation = useMutation(neutralizeThreadVote, {
    onSuccess: () => queryClient.invalidateQueries('threadsAndUsers'),
  });

  const authUser = useSelector((state) => state.authUser);

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    return (
      <div>
        Error:
        {error.message}
      </div>
    );
  }

  const { threads, users } = data || { threads: [], users: [] };

  const threadList = Array.isArray(threads)
    ? threads.map((thread) => ({
      ...thread,
      user: users.find((user) => user.id === thread.ownerId),
      votes: localVotes[thread.id] !== undefined ? localVotes[thread.id] : thread.votes,
    }))
    : [];

  const voteHandler = (threadId, action) => {
    const previousVotes = localVotes[threadId] !== undefined ? localVotes[threadId] : threads.find((thread) => thread.id === threadId).votes;
    let newVotes;

    if (action === 'upvote') {
      newVotes = previousVotes + 1;
      setLocalVotes((prev) => ({ ...prev, [threadId]: newVotes }));
      upVoteMutation.mutate(threadId, {
        onError: () => {
          setLocalVotes((prev) => ({ ...prev, [threadId]: previousVotes }));
        },
      });
    } else if (action === 'downvote') {
      newVotes = previousVotes - 1;
      setLocalVotes((prev) => ({ ...prev, [threadId]: newVotes }));
      downVoteMutation.mutate(threadId, {
        onError: () => {
          setLocalVotes((prev) => ({ ...prev, [threadId]: previousVotes }));
        },
      });
    } else if (action === 'neutralize') {
      newVotes = previousVotes;
      setLocalVotes((prev) => ({ ...prev, [threadId]: newVotes }));
      neutralizeVoteMutation.mutate(threadId, {
        onError: () => {
          setLocalVotes((prev) => ({ ...prev, [threadId]: previousVotes }));
        },
      });
    }
  };

  return (
    <Box as="main" width="auto" paddingY="5rem" backgroundColor="#FFF5E4">
      <Container as="section" maxWidth="5xl">
        <Box>
          <Heading as="h2" fontSize="3xl" color="teal.900" marginTop="1rem">
            Discussions
          </Heading>
          {threadList.length > 0 ? (
            <ThreadsList
              threads={threadList}
              authUserId={authUser.id}
              upVote={(threadId) => voteHandler(threadId, 'upvote')}
              downVote={(threadId) => voteHandler(threadId, 'downvote')}
              neutralizeVote={(threadId) => voteHandler(threadId, 'neutralize')}
            />
          ) : (
            <p>No threads available.</p>
          )}
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

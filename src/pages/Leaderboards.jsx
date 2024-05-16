import {
  Box, Container, Flex, Heading, Text,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';
import LeaderboardUserItem from '../components/LeaderboardUserItem';

function LeaderboardHeader() {
  return (
    <Flex as="header" mt={5} justify="space-between" fontSize="1.5rem">
      <Text>User</Text>
      <Text>Score</Text>
    </Flex>
  );
}

function LeaderboardList({ leaderboards, authUser }) {
  return (
    <Flex mt={2} direction="column" gap={2} fontSize="1.5rem">
      {leaderboards.map((leaderboard, index) => (
        <LeaderboardUserItem
          key={leaderboard.user.id}
          user={leaderboard.user}
          score={leaderboard.score}
          authUser={authUser} // tambahkan baris ini
          isTopUser={index === 0}
        />
      ))}
    </Flex>
  );
}

LeaderboardList.propTypes = {
  leaderboards: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        // Add other properties as needed
      }).isRequired,
      score: PropTypes.number.isRequired,
      // Add other properties as needed
    }),
  ).isRequired,
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string, // If optional
    email: PropTypes.string.isRequired, // If required
    // Define other necessary authUser properties here
  }).isRequired,
};

function Leaderboards() {
  const { authUser, leaderboards } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (leaderboards.length === 0) {
      dispatch(asyncReceiveLeaderboards());
    }
  }, [dispatch, leaderboards.length]);

  return (
    <Box as="main" w="auto" py="5rem" bg="#FFF5E4">
      <Container as="section" maxW="5xl">
        <Heading as="h2" fontSize="3xl" color="teal.900" mt="1rem">
          Active User Rankings
        </Heading>
        <LeaderboardHeader />
        <LeaderboardList leaderboards={leaderboards} authUser={authUser} />
      </Container>
    </Box>
  );
}

export default Leaderboards;
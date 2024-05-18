import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import LeaderboardUserItem, { AuthUserProvider } from '../components/LeaderboardUserItem';

export default {
  title: 'Components/LeaderboardUserItem',
  component: LeaderboardUserItem,
};

const leaderboardUser = {
  id: 'users-1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
  score: 10,
};

const leaderboardUser2 = {
  id: 'users-2',
  name: 'Jane Smith',
  email: 'jane@example.com',
  avatar: 'https://generated-image-url.jpg',
  score: 20,
};

const authUser = {
  id: 'users-1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};

export function LeaderboardUserIsAuthUser() {
  return (
    <ChakraProvider>
      <AuthUserProvider authUser={authUser}>
        <LeaderboardUserItem
          user={leaderboardUser}
          score={leaderboardUser.score}
          isTopUser
        />
      </AuthUserProvider>
    </ChakraProvider>
  );
}

export function LeaderboardUserNotAuthUser() {
  return (
    <ChakraProvider>
      <AuthUserProvider authUser={authUser}>
        <LeaderboardUserItem
          user={leaderboardUser2}
          score={leaderboardUser2.score}
          isTopUser={false}
        />
      </AuthUserProvider>
    </ChakraProvider>
  );
}

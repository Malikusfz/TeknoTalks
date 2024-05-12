import {
  Avatar, Box, Icon, Text,
} from '@chakra-ui/react';
import { createContext, useContext } from 'react';
import { FaCrown } from 'react-icons/fa';
import PropTypes from 'prop-types';

// Context untuk menyimpan data pengguna yang sedang login
const AuthUserContext = createContext();

export function AuthUserProvider({ children, authUser }) {
  return (
    <AuthUserContext.Provider value={authUser}>
      {children}
    </AuthUserContext.Provider>
  );
}

AuthUserProvider.propTypes = {
  children: PropTypes.node.isRequired,
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

// Komponen LeaderboardUserItem yang diperbarui
function LeaderboardUserItem({ user, score, isTopUser }) {
  const authUser = useContext(AuthUserContext) || {};

  // Pastikan authUser memiliki properti id sebelum melakukan perbandingan
  const isCurrentUser = authUser.id && authUser.id === user.id;
  const userNameDisplay = isCurrentUser ? `${user.name} (you)` : user.name;

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={4}
    >
      <Box display="flex" alignItems="center" gap="12px">
        <Avatar name={user.name} src={user.avatar} />
        <Text fontWeight={isTopUser ? 'bold' : 'normal'}>
          {userNameDisplay}
          {isTopUser && (
            <Icon as={FaCrown} color="yellow.400" w={5} h={5} ml={2} />
          )}
        </Text>
      </Box>
      <Text fontWeight={isTopUser ? 'bold' : 'normal'}>{score}</Text>
    </Box>
  );
}

LeaderboardUserItem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }).isRequired,
  score: PropTypes.number.isRequired,
  isTopUser: PropTypes.bool,
};

LeaderboardUserItem.defaultProps = {
  isTopUser: false,
};

export default LeaderboardUserItem;

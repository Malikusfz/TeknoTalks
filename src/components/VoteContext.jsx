import PropTypes from 'prop-types';
import React, {
  createContext, useContext, useState, useMemo,
} from 'react';

const VoteContext = createContext();

export const useVote = () => useContext(VoteContext);

export function VoteProvider({ children }) {
  const [votes, setVotes] = useState({});

  const upVote = (id) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [id]: 'up',
    }));
  };

  const downVote = (id) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [id]: 'down',
    }));
  };

  const neutralizeVote = (id) => {
    setVotes((prevVotes) => {
      const newVotes = { ...prevVotes };
      delete newVotes[id];
      return newVotes;
    });
  };

  const value = useMemo(() => ({
    votes,
    upVote,
    downVote,
    neutralizeVote,
  }), [votes, upVote, downVote, neutralizeVote]);

  return (
    <VoteContext.Provider value={value}>
      {children}
    </VoteContext.Provider>
  );
}

VoteProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

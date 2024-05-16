import PropTypes from 'prop-types';
import { useCallback } from 'react';
import ThreadItem from './ThreadItem';
import { threadsItemShape } from '../shapes/threadsItemShape';

export default function ThreadsList({
  threads,
  upVote,
  downVote,
  neutralizeVote,
  authUserId,
}) {
  const handleUpVote = useCallback((id) => upVote(id), [upVote]);
  const handleDownVote = useCallback((id) => downVote(id), [downVote]);
  const handleNeutralizeVote = useCallback(
    (id) => neutralizeVote(id),
    [neutralizeVote],
  );

  return (
    <div>
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          {...thread}
          authUserId={authUserId}
          upVote={() => handleUpVote(thread.id)}
          downVote={() => handleDownVote(thread.id)}
          neutralizeVote={() => handleNeutralizeVote(thread.id)}
        />
      ))}
    </div>
  );
}

ThreadsList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadsItemShape)).isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
  authUserId: PropTypes.string.isRequired,
};

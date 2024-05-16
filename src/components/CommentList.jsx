import { Flex } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import CommentItem from './CommentItem';
import commentItemShape from '../shapes/commentItemShape';

export default function CommentList({
  commentList,
  upVote,
  downVote,
  neutralizeVote,
  authUserId,
}) {
  // Memperbarui useCallback dengan dependensi yang benar
  const memoizedUpVote = useCallback(upVote, [upVote]);
  const memoizedDownVote = useCallback(downVote, [downVote]);
  const memoizedNeutralizeVote = useCallback(neutralizeVote, [neutralizeVote]);

  // Render CommentItem components
  const renderCommentItems = () => commentList.map((comment) => (
    <CommentItem
      key={comment.id}
      {...comment}
      upVote={memoizedUpVote}
      downVote={memoizedDownVote}
      neutralizeVote={memoizedNeutralizeVote}
      authUserId={authUserId}
    />
  ));

  return <Flex direction="column">{renderCommentItems()}</Flex>;
}

CommentList.propTypes = {
  commentList: PropTypes.arrayOf(PropTypes.shape(commentItemShape)).isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
  authUserId: PropTypes.string.isRequired,
};

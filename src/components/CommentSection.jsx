import { Box, Divider, Heading } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import commentItemShape from '../shapes/commentItemShape';

const CommentSection = React.memo(
  ({
    comments, comment, upVote, downVote, neutralizeVote, authUserId,
  }) => {
    // Menggunakan useCallback untuk menghindari pembuatan fungsi baru pada setiap render
    const memoizedUpVote = useCallback(upVote, [upVote]);
    const memoizedDownVote = useCallback(downVote, [downVote]);
    const memoizedNeutralizeVote = useCallback(neutralizeVote, [
      neutralizeVote,
    ]);

    return (
      <>
        <CommentInput comment={comment} />
        <Box position="relative" my={5}>
          <Divider borderColor="black" />
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            px="4"
            bg="#FFE3E1"
          >
            <Heading as="h3" fontSize="xl" color="black">
              Komentar (
              {comments.length}
              )
            </Heading>
          </Box>
        </Box>
        <CommentList
          commentList={comments}
          upVote={memoizedUpVote}
          downVote={memoizedDownVote}
          neutralizeVote={memoizedNeutralizeVote}
          authUserId={authUserId}
        />
      </>
    );
  },
);

CommentSection.displayName = 'CommentSection';

CommentSection.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape(commentItemShape)).isRequired,
  comment: PropTypes.func.isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
  authUserId: PropTypes.string.isRequired,
};

export default CommentSection;

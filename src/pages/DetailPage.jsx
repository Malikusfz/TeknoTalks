import {
  Box, Card, Container, Divider,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommentSection from '../components/CommentSection';
import ThreadDetailItem from '../components/ThreadDetailItem';
import {
  asyncAddThreadComment,
  asyncNeutralizeThreadDetailVote,
  asyncNeutralizeVoteComment,
  asyncReceiveThreadDetail,
  asyncToggleDownVoteComment,
  asyncToggleDownVoteThreadDetail,
  asyncToggleUpVoteComment,
  asyncToggleUpVoteThreadDetail,
} from '../states/threadDetail/action';

function DetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const threadDetail = useSelector((state) => state.threadDetail);
  const authUser = useSelector((state) => state.authUser);

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const handleVote = (action, payload) => {
    dispatch(action(payload));
  };

  if (!threadDetail) return null;

  return (
    <Box as="main" w="auto" py="5rem" bg="#FFF5E4">
      <Container as="section" maxW="5xl">
        <Card bg="#FFE3E1">
          <ThreadDetailItem
            upVote={() => handleVote(asyncToggleUpVoteThreadDetail, id)}
            downVote={() => handleVote(asyncToggleDownVoteThreadDetail, id)}
            neutralizeVote={() => handleVote(asyncNeutralizeThreadDetailVote, id)}
            authUserId={authUser.id}
            {...threadDetail}
          />
          <Divider color="black" />
          <CommentSection
            comment={({ commentValue }) => handleVote(asyncAddThreadComment, { threadId: id, commentValue })}
            upVote={(commentId) => handleVote(asyncToggleUpVoteComment, { threadId: id, commentId })}
            downVote={(commentId) => handleVote(asyncToggleDownVoteComment, {
              threadId: id,
              commentId,
            })}
            neutralizeVote={(commentId) => handleVote(asyncNeutralizeVoteComment, {
              threadId: id,
              commentId,
            })}
            authUserId={authUser.id}
            {...threadDetail}
          />
        </Card>
      </Container>
    </Box>
  );
}

export default DetailPage;

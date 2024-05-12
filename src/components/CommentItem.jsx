import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';
import {
  BiDownvote,
  BiSolidDownvote,
  BiSolidUpvote,
  BiUpvote,
} from 'react-icons/bi';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import commentItemShape from '../shapes/commentItemShape';
import postedAt from '../utils/index';

export default function CommentItem({
  id,
  content,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  upVote,
  downVote,
  neutralizeVote,
  authUserId,
}) {
  const upVoteIsActive = upVotesBy.includes(authUserId);
  const downVoteIsActive = downVotesBy.includes(authUserId);

  const onVoteHandleClick = (isUpvote) => {
    const action = isUpvote ? upVote : downVote;
    const isActive = isUpvote ? upVoteIsActive : downVoteIsActive;

    if (isActive) {
      neutralizeVote(id);
    } else {
      action(id);
    }
  };

  return (
    <CardBody m={-2}>
      <Card bg="#FFD1D1">
        <CardHeader
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Flex align="center" gap={2}>
            <Avatar size="sm" name={owner.name} src={owner.avatar} />
            <Heading as="p" fontSize="lg">
              {owner.name}
            </Heading>
          </Flex>
          <Text>{postedAt(createdAt)}</Text>
        </CardHeader>
        <CardBody mt={-5}>
          <Text as="div">{parse(content)}</Text>
        </CardBody>
        <CardFooter>
          <Flex gap={2} align="center">
            <Button
              colorScheme="pink"
              isActive={upVoteIsActive}
              leftIcon={upVoteIsActive ? <BiSolidUpvote /> : <BiUpvote />}
              aria-label="Upvote Button"
              onClick={() => onVoteHandleClick(true)}
            >
              <Text>{upVotesBy.length}</Text>
            </Button>
            <Button
              colorScheme="pink"
              isActive={downVoteIsActive}
              leftIcon={downVoteIsActive ? <BiSolidDownvote /> : <BiDownvote />}
              aria-label="Downvote Button"
              onClick={() => onVoteHandleClick(false)}
            >
              <Text>{downVotesBy.length}</Text>
            </Button>
          </Flex>
        </CardFooter>
      </Card>
    </CardBody>
  );
}

CommentItem.propTypes = {
  ...commentItemShape,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
  authUserId: PropTypes.string.isRequired,
};

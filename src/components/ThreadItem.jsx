import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Icon,
  Tag,
  Text,
} from '@chakra-ui/react';
import {
  BiDownvote,
  BiSolidDownvote,
  BiSolidUpvote,
  BiUpvote,
} from 'react-icons/bi';
import { FaRegCommentAlt } from 'react-icons/fa';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import postedAt from '../utils/index';
import { threadsItemShape } from '../shapes/threadsItemShape';

export default function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  user,
  upVotesBy,
  downVotesBy,
  totalComments,
  upVote,
  downVote,
  neutralizeVote,
  authUserId,
}) {
  const [voteState, setVoteState] = useState('neutral');

  useEffect(() => {
    if (upVotesBy.includes(authUserId)) {
      setVoteState('upvoted');
    } else if (downVotesBy.includes(authUserId)) {
      setVoteState('downvoted');
    } else {
      setVoteState('neutral');
    }
  }, [authUserId, downVotesBy, upVotesBy]);

  const navigate = useNavigate();

  const onVoteHandleClick = (event, voteType) => {
    event.stopPropagation();
    if (voteState === voteType) {
      neutralizeVote(id);
      setVoteState('neutral');
    } else {
      if (voteType === 'upvoted') {
        upVote(id);
      } else {
        downVote(id);
      }
      setVoteState(voteType);
    }
  };

  const onThreadClick = () => {
    navigate(`/thread/${id}`);
  };

  return (
    <Card
      size="md"
      mt="1rem"
      bg="#FFE3E1"
      onClick={onThreadClick}
      _hover={{ cursor: 'pointer', bg: '#FFD1D1' }}
    >
      <CardHeader as="header">
        <Tag
          size="md"
          bg="#FFD1D1"
          color="black"
          variant="solid"
          borderRadius="full"
        >
          <Text fontSize="xs">
            #
            {category}
          </Text>
        </Tag>
        <Heading color="teal.900">{title}</Heading>
      </CardHeader>
      <CardBody mt={-5} fontSize="md" color="teal.900">
        <Text as="div" noOfLines={3}>
          {parse(body)}
        </Text>
      </CardBody>
      <CardFooter as="footer" justify="space-between" gap={15}>
        <Flex gap={2} align="center">
          <Button
            colorScheme="pink"
            isActive={voteState === 'upvoted'}
            leftIcon={
              voteState === 'upvoted' ? <BiSolidUpvote /> : <BiUpvote />
            }
            aria-label="Upvote Button"
            onClick={(e) => onVoteHandleClick(e, 'upvoted')}
          >
            <Text>{upVotesBy.length}</Text>
          </Button>
          <Button
            colorScheme="pink"
            isActive={voteState === 'downvoted'}
            leftIcon={
              voteState === 'downvoted' ? <BiSolidDownvote /> : <BiDownvote />
            }
            aria-label="Downvote Button"
            onClick={(e) => onVoteHandleClick(e, 'downvoted')}
          >
            <Text>{downVotesBy.length}</Text>
          </Button>
          <Icon as={FaRegCommentAlt} boxSize={5} />
          <Text>{totalComments}</Text>
        </Flex>
        <Flex gap={5}>
          <Text>{postedAt(createdAt)}</Text>
          <Text>
            Created by
            {' '}
            <Heading as="span" fontSize="1rem">
              {user.name}
            </Heading>
          </Text>
        </Flex>
      </CardFooter>
    </Card>
  );
}

ThreadItem.propTypes = {
  ...threadsItemShape,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
  authUserId: PropTypes.string.isRequired,
};

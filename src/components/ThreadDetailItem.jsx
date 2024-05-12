import {
  Avatar,
  Box,
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Tag,
  Text,
} from '@chakra-ui/react';
import {
  BiDownvote,
  BiSolidDownvote,
  BiSolidUpvote,
  BiUpvote,
} from 'react-icons/bi';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import { useCallback, useState } from 'react';
import postedAt from '../utils/index';

const useVote = (
  authUserId,
  upVotesBy,
  downVotesBy,
  upVote,
  downVote,
  neutralizeVote,
) => {
  const [voteStatus, setVoteStatus] = useState({
    upVoteIsActive: upVotesBy.includes(authUserId),
    downVoteIsActive: downVotesBy.includes(authUserId),
  });

  const handleVote = useCallback(
    (type) => {
      const isUpVote = type === 'upVote';
      const isActive = isUpVote
        ? voteStatus.upVoteIsActive
        : voteStatus.downVoteIsActive;
      const voteAction = isUpVote ? upVote : downVote;

      if (isActive) {
        neutralizeVote();
        setVoteStatus({
          upVoteIsActive: false,
          downVoteIsActive: false,
        });
      } else {
        voteAction();
        setVoteStatus({
          upVoteIsActive: isUpVote,
          downVoteIsActive: !isUpVote,
        });
      }
    },
    [upVote, downVote, neutralizeVote, voteStatus],
  );

  return { voteStatus, handleVote };
};

export default function ThreadDetailItem(props) {
  const {
    upVote,
    downVote,
    neutralizeVote,
    authUserId,
    title,
    body,
    category,
    createdAt,
    owner,
    upVotesBy,
    downVotesBy,
  } = props;
  const { voteStatus, handleVote } = useVote(
    authUserId,
    upVotesBy,
    downVotesBy,
    upVote,
    downVote,
    neutralizeVote,
  );

  return (
    <Box
      bg="#FFE3E1"
      p={4}
      rounded="md"
      shadow="sm"
      border="1px"
      borderColor="gray.200"
    >
      <CardHeader as="header">
        <Tag
          size="lg"
          bg="#FFD1D1"
          color="teal.900"
          variant="solid"
          borderRadius="full"
          mb={2}
        >
          <Text fontSize="s">
            #
            {category}
          </Text>
        </Tag>
        <Heading as="h2" size="2xl" color="teal.900">
          {title}
        </Heading>
      </CardHeader>
      <CardBody fontSize="md" color="teal.900" mt={-5}>
        <Text as="div" fontSize="xl" noOfLines={3}>
          {parse(body)}
        </Text>
      </CardBody>
      <CardFooter as="footer" justify="space-between" gap={15} fontSize="lg">
        <Flex gap={2} align="center">
          <Button
            colorScheme="pink"
            isActive={voteStatus.upVoteIsActive}
            leftIcon={
              voteStatus.upVoteIsActive ? <BiSolidUpvote /> : <BiUpvote />
            }
            aria-label="Upvote Button"
            onClick={() => handleVote('upVote')}
          >
            <Text>{upVotesBy.length}</Text>
          </Button>
          <Button
            colorScheme="pink"
            isActive={voteStatus.downVoteIsActive}
            leftIcon={
              voteStatus.downVoteIsActive ? <BiSolidDownvote /> : <BiDownvote />
            }
            aria-label="Downvote Button"
            onClick={() => handleVote('downVote')}
          >
            <Text>{downVotesBy.length}</Text>
          </Button>
        </Flex>
        <Flex alignItems="center" gap={5}>
          <Text>{postedAt(createdAt, 'id')}</Text>
          {' '}
          <Box display="flex" alignItems="center" gap={1}>
            <Avatar size="sm" name={owner.name} src={owner.avatar} />
            <Text>
              Created by
              {' '}
              <Heading as="span" fontSize="lg">
                {owner.name}
              </Heading>
            </Text>
          </Box>
        </Flex>
      </CardFooter>
    </Box>
  );
}

const ownerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const threadDetail = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

ThreadDetailItem.propTypes = {
  ...threadDetail,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
  authUserId: PropTypes.string.isRequired,
};

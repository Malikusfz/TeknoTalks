// CommentInput.jsx
import {
  Box, Button, CardBody, Heading, Textarea,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

export default function CommentInput({ comment }) {
  const { value: commentValue, handleValueChange, resetValue } = useInput('');

  const handleSubmit = () => {
    // Pastikan comment adalah fungsi sebelum memanggilnya
    if (typeof comment === 'function') {
      comment({ commentValue });
      resetValue();
    } else {
      // Jika bukan fungsi, tampilkan pesan kesalahan
      console.error('comment is not a function');
    }
  };

  return (
    <Box bg="#FFE3E1">
      <CardBody>
        <Heading as="h3" fontSize="xl" mb={2}>
          Leave a Comment
        </Heading>
        <Textarea
          bg="#FFF5E4"
          focusBorderColor="white"
          value={commentValue}
          onChange={handleValueChange}
        />
        <Button
          w="full"
          size="md"
          mt={2}
          colorScheme="pink"
          variant="solid"
          type="button"
          onClick={handleSubmit}
        >
          Send
        </Button>
      </CardBody>
    </Box>
  );
}

CommentInput.propTypes = {
  comment: PropTypes.func.isRequired,
};

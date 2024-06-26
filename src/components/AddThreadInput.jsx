import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  Input,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import { IoSend } from 'react-icons/io5';
import PropTypes from 'prop-types';

export default function AddThreadInput({ addThread }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');
  const [categories] = useState([
    'Technology',
    'Education',
    'Health',
    'Sports',
    'Entertainment',
    'Science',
    'Business',
    'Travel',
  ]);
  const [filteredCategories, setFilteredCategories] = useState([]);

  const handleInputChange = (setter) => (event) => setter(event.target.value);

  const handleCategoryChange = (event) => {
    const input = event.target.value;
    setCategory(input);
    if (!input) {
      setFilteredCategories([]);
    } else {
      setFilteredCategories(
        categories.filter((cat) => cat.toLowerCase().includes(input.toLowerCase())),
      );
    }
  };

  const handleSubmit = () => {
    addThread({ title, category, body });
    setTitle('');
    setCategory('');
    setBody('');
  };

  return (
    <Card
      as="form"
      onSubmit={(e) => e.preventDefault()}
      bg="#FFE3E1"
      p="5"
      rounded="md"
    >
      <CardBody>
        <Stack spacing={3}>
          <Input
            focusBorderColor="teal.400"
            placeholder="Title"
            value={title}
            onChange={handleInputChange(setTitle)}
            bg="white"
          />
          <Box position="relative">
            <Input
              focusBorderColor="teal.400"
              placeholder="Category"
              value={category}
              onChange={handleCategoryChange}
              bg="white"
            />
            {filteredCategories.length > 0 && (
              <Box
                position="absolute"
                bg="white"
                w="full"
                mt="1"
                zIndex="1000"
                boxShadow="md"
              >
                {filteredCategories.map((cat) => (
                  <Box
                    key={cat}
                    p="2"
                    borderBottom="1px"
                    borderColor="gray.200"
                    _hover={{ bg: 'gray.100' }}
                    onClick={() => {
                      setCategory(cat);
                      setFilteredCategories([]);
                    }}
                  >
                    {cat}
                  </Box>
                ))}
              </Box>
            )}
          </Box>
          <Textarea
            focusBorderColor="teal.400"
            placeholder="Content"
            value={body}
            onChange={handleInputChange(setBody)}
            bg="white"
          />
        </Stack>
        <Button
          w="full"
          mt="4"
          colorScheme="teal"
          variant="solid"
          onClick={handleSubmit}
          rightIcon={<IoSend />}
        >
          Create
        </Button>
      </CardBody>
    </Card>
  );
}

AddThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
};

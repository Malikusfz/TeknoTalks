import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { LiaEyeSlash, LiaEyeSolid } from 'react-icons/lia';
import PropTypes from 'prop-types';
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

// Validation schema using yup
const validationSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});

export default function LoginInput({ login }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickVisibility = () => setShowPassword(!showPassword);

  // useFormik hook for form state management and validation
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      login(values);
    },
  });

  return (
    <Box as="form" onSubmit={formik.handleSubmit}>
      <FormControl mt={4} id="email" isRequired>
        <FormLabel>Email address</FormLabel>
        <Input
          type="email"
          focusBorderColor="teal.400"
          {...formik.getFieldProps('email')}
          placeholder="Email"
        />
        {formik.touched.email && formik.errors.email ? (
          <Box color="red.500" mt={2}>{formik.errors.email}</Box>
        ) : null}
      </FormControl>
      <FormControl mt={4} id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={showPassword ? 'text' : 'password'}
            focusBorderColor="teal.400"
            {...formik.getFieldProps('password')}
            placeholder="Password"
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={handleClickVisibility}
              bg="transparent"
            >
              {showPassword ? <LiaEyeSlash /> : <LiaEyeSolid />}
            </Button>
          </InputRightElement>
        </InputGroup>
        {formik.touched.password && formik.errors.password ? (
          <Box color="red.500" mt={2}>{formik.errors.password}</Box>
        ) : null}
      </FormControl>
      <Button w="full" mt="6" colorScheme="teal" variant="solid" type="submit">
        Sign In
      </Button>
    </Box>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired, // Adding validation for prop 'login'
};

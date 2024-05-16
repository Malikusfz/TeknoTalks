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

// Skema validasi menggunakan yup
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

  // useFormik hook untuk mengelola form state dan validasi
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
          <div>{formik.errors.email}</div>
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
          <div>{formik.errors.password}</div>
        ) : null}
      </FormControl>
      <Button w="full" mt="6" colorScheme="teal" variant="solid" type="submit">
        Sign In
      </Button>
    </Box>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired, // Menambahkan validasi untuk prop 'login'
};

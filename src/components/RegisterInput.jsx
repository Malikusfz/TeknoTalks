import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Skema validasi menggunakan Yup
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

export default function RegisterInput({ register }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickVisibility = () => setShowPassword(!showPassword);

  // useFormik hook untuk penanganan form
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      register(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          focusBorderColor="teal.400"
          name={formik.getFieldProps('name').field.value}
          onChange={formik.getFieldProps('name').field.onChange}
        />
        {formik.touched.name && formik.errors.name && (
          <Alert status="error" mt={2}>
            <AlertIcon />
            <AlertDescription>{formik.errors.name}</AlertDescription>
          </Alert>
        )}
      </FormControl>

      <FormControl mt={4} id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          focusBorderColor="teal.400"
          {...formik.getFieldProps('email')}
        />
        {formik.touched.email && formik.errors.email && (
          <Alert status="error" mt={2}>
            <AlertIcon />
            <AlertDescription>{formik.errors.email}</AlertDescription>
          </Alert>
        )}
      </FormControl>

      <FormControl mt={4} id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            focusBorderColor="teal.400"
            type={showPassword ? 'text' : 'password'}
            {...formik.getFieldProps('password')}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClickVisibility}>
              {showPassword ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
        {formik.touched.password && formik.errors.password && (
          <Alert status="error" mt={2}>
            <AlertIcon />
            <AlertDescription>{formik.errors.password}</AlertDescription>
          </Alert>
        )}
      </FormControl>

      <Button w="full" mt={6} colorScheme="teal" variant="solid" type="submit">
        Sign Up
      </Button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

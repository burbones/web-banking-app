import { Button, Center, Flex, Grid, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { InputControl } from "formik-chakra-ui";

import loginPic from "../../img/login.png";
import axios from "axios";
import { DASHBOARD_URL, SERVER_LOGIN_URL, SIGNUP_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { setUser } from "../../authSlice";
import { useNavigate } from "react-router-dom";

import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import { useState } from "react";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  return (
      <Formik
      initialValues={{ email: '', password: '' }}
      validate={values => {
        setErrorMessage(null);
        const errors = {};
        if (!values.email) {
          errors.email = '*Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
          const user = values.email;
          axios.post(SERVER_LOGIN_URL,values)
            .then((res) => {
              dispatch(setUser({user: user, token: res.data}));
              navigate(DASHBOARD_URL);
            })
            .catch((error) => {
              setErrorMessage(error.response.data.error);
            })
          setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form h="100%">
          <Grid h="100%" w="100%" placeItems="center">
              <Flex direction='column' justify='space-around' boxShadow="xl" borderRadius="md" minH="80vh" w={{base: "80vw", md: "30vw"}} bgColor='white'>
                  <Stack p="4" pl="10" pr="10" spacing="5">
                      <Heading as='h1' pt={10}>Log in</Heading>
                      <Center h="100%">
                        <Image src={loginPic} alt='Logic pic' w="50%" />
                      </Center>
                      
                      <InputControl type="email" name="email" inputProps={{type: "email", placeholder: "Enter Email..."}}/>
                      <InputControl type="password" name="password" inputProps={{type: "password", placeholder: "Enter Password..."}}/>
                  </Stack>
                  <Center>
                    <Text color="red">{errorMessage}</Text>
                  </Center>
                  <Center>
                      <Button
                          minW="20%"
                          mb="10"
                          type="submit"
                          disabled={isSubmitting}
                          colorScheme='purple'
                          >
                          Submit
                      </Button>
                  </Center>
                  <Center>
                    <Text display={{ base: "none", md: "flex" }}>
                      Don’t have an account yet?&nbsp; <ChakraLink as={ReactRouterLink} to={SIGNUP_URL} color='blue'>Sign up here!</ChakraLink>
                    </Text>
                    <Text display={{ base: "block", md: "none" }} mb="5" textAlign="center">
                      Don’t have an account yet?<br /> <ChakraLink as={ReactRouterLink} to={SIGNUP_URL} color='blue'>Sign up here!</ChakraLink>
                    </Text>
                  </Center>
              </Flex>
          </Grid>

        </Form>
      )}
    </Formik>
  );
}
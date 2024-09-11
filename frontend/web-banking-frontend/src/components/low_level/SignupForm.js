import { Button, Center, Flex, Grid, Heading, Image, Stack, Text, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { InputControl } from "formik-chakra-ui";

import signupPic from "../../img/signupPic.png";
import axios from "axios";
import { LOGIN_URL, SERVER_SIGN_UP_URL } from "../../utils/constants";

import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';

export default function SignupForm(props) {
    const toast = useToast();

    return (
        <Formik
        initialValues={{ email: '', phone: '', password: '' }}
        validate={values => {
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
            axios.post(SERVER_SIGN_UP_URL, values)
              .then((res) => {
                props.setEmail(values.email);
                props.next();
              })
              .catch((error) => {
                toast({
                  position: 'top-center',
                  title: error.response.data.error,
                  status: "error",
                  duration: 5000,
                });
              })
            setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form h="100%">
            <Grid h="100%" w="100%" placeItems="center">
                <Flex direction='column' justify='space-around' boxShadow="xl" borderRadius="md" minH="80vh" w="30vw" bgColor="white">
                    <Stack p="4" pl="10" pr="10" spacing="5">
                        <Heading as='h1' pt={10}>Sign up</Heading>
                        <Center h="100%">
                          <Image src={signupPic} alt='Signup pic' w="50%" opacity="0.7" />
                        </Center>
                        
                        <InputControl type="email" name="email" inputProps={{type: "email", placeholder: "Enter Email..."}}/>
                        <InputControl type="text" name="phone" inputProps={{type: "text", placeholder: "Enter Phone..."}}/>
                        <InputControl type="password" name="password" inputProps={{type: "password", placeholder: "Enter Password..."}}/>
                    </Stack>
                    <Center>
                        <Button
                            w="20%"
                            mb="10"
                            type="submit"
                            disabled={isSubmitting}
                            colorScheme='purple'
                            >
                            Sign up
                        </Button>
                    </Center>
                    <Center>
                      <Text>
                            Already have an account? <ChakraLink as={ReactRouterLink} to={LOGIN_URL} color='blue'>Log in here!</ChakraLink>
                      </Text>
                    </Center>
                </Flex>
            </Grid>
  
          </Form>
        )}
      </Formik>
    );
}
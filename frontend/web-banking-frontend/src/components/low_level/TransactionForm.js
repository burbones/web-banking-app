import axios from "axios";

import { useDispatch } from "react-redux";
import { Form, useNavigate } from "react-router-dom";

import { Link as ReactRouterLink } from 'react-router-dom';
import { Button, Center, Link as ChakraLink, Flex, Grid, Heading, Image, Stack, useToast } from '@chakra-ui/react';
import { Formik } from "formik";
import { InputControl } from "formik-chakra-ui";
import transferPic from "../../img/transferPic.png";

export default function TransactionForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();
  
    return (
        <Formik
        initialValues={{ receiver: '', actionType: '', amount: '', description: '' }}
        validate={values => {
          const errors = {};
          if (!values.receiver) {
            errors.receiver = '*Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.receiver)
          ) {
            errors.receiver = 'Invalid email address';
          }

          if (values.amount <= 0) {
            errors.amount = 'The amount should be greater than zero';
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
            /*const user = values.email;
            axios.post(SERVER_LOGIN_URL,values)
              .then((res) => {
                dispatch(setUser({user: user, token: res.data}));
                navigate(DASHBOARD_URL);
              })
              .catch((error) => {
                toast({
                  position: 'top-center',
                  title: error.response.data.error,
                  status: "error",
                  duration: 5000,
                });
              })
            */
            setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form h="100%">
            <Grid h="100%" w="100%" placeItems="left">
                <Flex direction='column' justify='space-around' boxShadow="xl" borderRadius="md" w="30vw" bgColor='white'>
                    <Stack p="4" pl="10" pr="10" spacing="5">
                        <Heading as='h1' pt={10} mb={10}>Transfer details</Heading>
                        
                        <InputControl type="email" name="receiver" inputProps={{type: "email", placeholder: "To whom (email)"}}/>
                        <InputControl type="number" name="amount" inputProps={{type: "number", placeholder: "Enter amount (in dollars)"}}/>
                        <InputControl type="text" name="description" inputProps={{type: "text", placeholder: "Enter transfer description"}}/>
                    </Stack>
                    <Center>
                        <Button
                            minW="20%"
                            mb="10" mt="10"
                            type="submit"
                            disabled={isSubmitting}
                            colorScheme='purple'
                            >
                            Send money
                        </Button>
                    </Center>
                </Flex>
            </Grid>
  
          </Form>
        )}
      </Formik>
    );
}
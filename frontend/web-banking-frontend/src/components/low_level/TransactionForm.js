import axios, { HttpStatusCode } from "axios";

import { useDispatch, useSelector } from "react-redux";

import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Center, Flex, Grid, Heading, Stack, useDisclosure, useToast } from '@chakra-ui/react';
import { Form, Formik } from "formik";
import { InputControl } from "formik-chakra-ui";
import { LOGIN_URL, SERVER_TRANSACTION_URL } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../authSlice";
import { useRef } from "react";

export default function TransactionForm(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useToast();
    const token = useSelector((state) => state.auth.token);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();
  
    return (
        <Formik
        initialValues={{ user: '', amount: '', description: '' }}
        validate={values => {
          const errors = {};
          if (!values.user) {
            errors.user = '*Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.user)
          ) {
            errors.user = 'Invalid email address';
          }

          if (values.amount <= 0) {
            errors.amount = 'The amount should be greater than zero';
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
            const data = {...values};
            data.type = "send";
            data.amount = data.amount * 100;
            axios.post(SERVER_TRANSACTION_URL, data, {
                headers: {
                    'Authorization': 'Bearer ' + token
                },
            })
              .then((res) => {
                onOpen();
                props.setIsRefreshNeeded(true);
                resetForm();
              })
              .catch((error) => {
                if (error.status === HttpStatusCode.Unauthorized) {
                    dispatch(setUser({token: ""}));
                    navigate(LOGIN_URL);
                }
                toast({
                  position: 'bottom-center',
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
            <Grid h="100%" w="100%" placeItems="left">
                <Flex direction='column' justify='space-around' boxShadow="xl" borderRadius="md" w={{ base: "90vw", md: "30vw" }} bgColor='white'>
                    <Stack p="4" pl="10" pr="10" spacing="5">
                        <Heading as='h1' pt={10} mb={10}>Transfer details</Heading>
                        
                        <InputControl type="email" name="user" inputProps={{type: "email", placeholder: "To whom (email)"}}/>
                        <InputControl type="number" name="amount" inputProps={{type: "number", placeholder: "Enter amount (in dollars)"}}/>
                        <InputControl type="text" name="description" inputProps={{type: "text", placeholder: "Enter transfer description"}}/>
                    </Stack>
                    <Center>
                        <Button
                            minW="20%"
                            mb="10"
                            mt="10"
                            type="submit"
                            disabled={isSubmitting}
                            colorScheme='purple'
                            >
                            Send money
                        </Button>
                    </Center>
                </Flex>
            </Grid>
            <SuccessAlert isOpen={isOpen} onClose={onClose} cancelRef={cancelRef} />
          </Form>
        )}
      </Formik>
    );
}

function SuccessAlert( {isOpen, onClose, cancelRef} ) {
  return (
    <AlertDialog isOpen={isOpen} onClose={onClose} isCentered>
      <AlertDialogOverlay>
        <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Successful operation
            </AlertDialogHeader>

            <AlertDialogBody>
                The transaction is successfully completed.
            </AlertDialogBody>

            <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                    OK
                </Button>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
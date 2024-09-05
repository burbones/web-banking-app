import { Button, Center, Flex, Grid, Heading, Image, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { InputControl } from "formik-chakra-ui";

import signupPic from "../../img/signupPic.png";
import axios from "axios";
import { SERVER_LOGIN_URL } from "../../utils/constants";

export default function SignupForm(props) {

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
            props.next();
            /*axios.post(SERVER_LOGIN_URL,values)
              .then((res) => {
                props.next();
              })
              .catch((error) => {
                console.log(error.response.status);
              })
            setSubmitting(false);*/
        }}
      >
        {({ isSubmitting }) => (
          <Form h="100%">
            <Grid h="100%" w="100%" placeItems="center">
                <Flex direction='column' justify='space-between' boxShadow="xl" borderRadius="md" h="80vh" w="30vw">
                    <Stack p="4" spacing="5">
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
                </Flex>
            </Grid>
  
          </Form>
        )}
      </Formik>
    );
}
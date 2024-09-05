import { Button, Center, Flex, Grid, Heading, Image, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { InputControl } from "formik-chakra-ui";

import loginPic from "../../img/login.png";
import axios from "axios";
import { DASHBOARD_URL, SERVER_LOGIN_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { setUser } from "../../authSlice";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
      <Formik
      initialValues={{ email: '', password: '' }}
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
          axios.post(SERVER_LOGIN_URL,values)
            .then((res) => {
              dispatch(setUser({token: res.data}));
            })
            .catch((error) => {
              console.log(error.response.status);
            })
          setSubmitting(false);
          //navigate(DASHBOARD_URL);

      }}
    >
      {({ isSubmitting }) => (
        <Form h="100%">
          <Grid h="100%" w="100%" placeItems="center">
              <Flex direction='column' justify='space-between' boxShadow="xl" borderRadius="md" h="80vh" w="30vw">
                  <Stack p="4" spacing="5">
                      <Heading as='h1' pt={10}>Log in</Heading>
                      <Image src={loginPic} alt='Logic pic' boxSize="50%" />
                      <InputControl type="email" name="email" inputProps={{type: "email", placeholder: "Enter Email..."}}/>
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
                          Submit
                      </Button>
                  </Center>
              </Flex>
          </Grid>

        </Form>
      )}
    </Formik>
  );
}
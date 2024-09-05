import { Button, Center, Flex, Grid, Heading, Stack, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { InputControl } from "formik-chakra-ui";

export default function CodeCheck(props) {
    return (
        <Formik
        initialValues={{ code: '' }}
        validate={values => {
          const errors = {};
          if (!values.code) {
            errors.code = '*Required';
          } else if (
            !/^[0-9]{6}$/i.test(values.code)
          ) {
            errors.code = 'The code should contain of 6 digits';
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
                        <Heading as='h1' pt={10}>Email verification</Heading>

                        <Text>
                            A verification code was sent to the email example@example.org.
                        </Text>
                        <Text>
                            Please, enter the code below:
                        </Text>
                        
                        <InputControl type="number" name="code" inputProps={{type: "number", placeholder: "Enter 6 digit code..."}}/>
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
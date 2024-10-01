import { Button, Flex, Grid, Heading, Stack, Text } from "@chakra-ui/react";
import { Link as ReactRouterLink } from 'react-router-dom';
import { LOGIN_URL } from "../../utils/constants";

export default function SignupResult(props) {
    console.log(props.status);

    const content = props.status ?
    <>
        <Heading as='h1' pt={10}>Success!</Heading>
        <Text>
            You are successfully registered!
        </Text>
    </>
 :
    <>
        <Heading as='h1' pt={10}>Verification error</Heading>
        <Text>
            The code entered is incorrect or the registration period expired.
        </Text>

        <Text>
            Please, try signing up again later.
        </Text>
    </>;

    return (
        <Grid h="100%" w="100%" placeItems="center">
            <Flex direction='column' justify='space-between' boxShadow="xl" borderRadius="md" h="80vh" w="30vw" bgColor="white">
            <Stack p="4" spacing="5">
                {content}

                <Button
                w="20%"
                mt="10"
                colorScheme='purple'
                as={ReactRouterLink}
                to={LOGIN_URL}
            >
                To Log in
            </Button>
            </Stack>
            </Flex>
        </Grid>

    );
}
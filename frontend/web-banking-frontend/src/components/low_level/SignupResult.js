import { Flex, Grid, Heading, Stack, Text } from "@chakra-ui/react";

export default function SignupResult() {
    return (
        <Grid h="100%" w="100%" placeItems="center">
            <Flex direction='column' justify='space-between' boxShadow="xl" borderRadius="md" h="80vh" w="30vw">
                <Stack p="4" spacing="5">
                    <Heading as='h1' pt={10}>Verification error</Heading>
                    <Text>
                        The code entered is incorrect or the registration period expired.
                    </Text>

                    <Text>
                        Please, try signing up again later.
                    </Text>
                </Stack>
            </Flex>
        </Grid>

    );
}
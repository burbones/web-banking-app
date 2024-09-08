import { Box, Button, Center, Flex, Heading, Text } from "@chakra-ui/react";
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import { LOGIN_URL, SIGNUP_URL } from "../utils/constants";
import back from "../img/background.jpg";
import { ArrowForwardIcon } from "@chakra-ui/icons";

export default function Welcome() {
    return (
        <main>
            <Box w="100%" h="100%" bgImage={back}>
                <Center w="50vw" h="80%">
                    <Flex>
                        <Box p="10" bg="white" borderWidth='1px' borderRadius='lg'>
                            <Heading as='h1' size='4xl' mb='10'>
                                Welcome to the <br /> <em>Web Banking App!</em>
                            </Heading>
                            <Button 
                                colorScheme='purple'
                                size='lg'
                                mb='10'
                                rightIcon={<ArrowForwardIcon />}
                                as={ReactRouterLink}
                                to={LOGIN_URL}
                            >
                                To Login
                            </Button>
                            <Text fontSize='2xl'>
                                Don't have an accout yet? <br />
                                <ChakraLink as={ReactRouterLink} to={SIGNUP_URL} color='teal.500'>
                                Create one for free!
                                </ChakraLink>
                            </Text>
                        </Box>
                    </Flex>
                </Center>
            </Box>

        </main>
    );
}
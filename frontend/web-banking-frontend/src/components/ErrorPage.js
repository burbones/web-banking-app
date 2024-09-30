import { Box, Button, Card, Flex, Grid, GridItem, Heading, Image, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import pageNotFound from "../img/Scarecrow.png";
import Footing from "./Footing";
import { useNavigate } from "react-router-dom";
import { DASHBOARD_URL, LOGIN_URL } from "../utils/constants";
import { useSelector } from "react-redux";

export default function ErrorPage() {
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    const toHome = () => {
        console.log("click");

        if (user) {
            navigate(DASHBOARD_URL);
        } else {
            navigate(LOGIN_URL);
        }
    }

    return (
        <>
            <Box as="main" w="100%" bg={useColorModeValue('gray.50')}>
                <Grid h="100%" templateColumns={{ base: '0% 100%', md: 'repeat(2, 1fr)' }} gap={{ base: "0", md: "10" }} pt='10'>
                    <GridItem>
                        <Flex h="100%" alignItems="center" ml="10">
                            <Image
                                src={pageNotFound}
                                alt="inspirational citation"
                                borderRadius="20"
                                mb="20"
                            />
                        </Flex>

                    </GridItem>
                    
                    <GridItem>
                        <Flex h="100%" alignItems="center" justifyContent="center">
                            <Card w="50%" p="10">
                                <Stack>
                                    <Heading as="h1" mb="5">PAGE NOT FOUND</Heading>
                                    <Text fontSize="xl" mb="10">The page you are looking for doesn't exist.</Text>
                                    <Button
                                        w="50%"
                                        colorScheme='purple'
                                        onClick={toHome}
                                    >
                                        Back to home
                                    </Button>
                                </Stack>
                            </Card>
                        </Flex>
                    </GridItem>
                </Grid>
            </Box>

            <Footing />
        </>
    );
}
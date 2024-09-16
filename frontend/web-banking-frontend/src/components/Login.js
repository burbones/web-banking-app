import { Box, Center, Grid, GridItem, Image } from "@chakra-ui/react";
import LoginForm from "./low_level/LoginForm";
import loginBackground from "../img/login_back_new.jpg";
import saveMoney from "../img/save_money.jpg";

export default function Login() {
    return (
        <Box as='main' w="100%" h="90vh" bgImage={loginBackground}>
            <Grid h="100%" templateColumns={{ base: '0% 100%', md: 'repeat(2, 1fr)' }} gap={{ base: "0", md: "10" }} pt='10'>
                <GridItem>
                    <Center h="100%">
                        <Image
                            src={saveMoney}
                            alt="inspirational citation"
                            borderRadius="20"
                            mb="20" />
                    </Center>
                </GridItem>
                <GridItem h="100%"> 
                    <LoginForm />
                </GridItem>
            </Grid>
        </Box>
    );
}
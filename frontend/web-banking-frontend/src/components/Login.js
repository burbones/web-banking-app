import { Box, Grid, GridItem } from "@chakra-ui/react";
import LoginForm from "./low_level/LoginForm";

export default function Login() {
    return (
        <Box as='main' w="100%" h="90vh">
            <Grid h="100%" templateColumns='repeat(2, 1fr)' gap={10} pt='10'>
                <GridItem />
                <GridItem h="100%"> 
                    <LoginForm />
                </GridItem>
            </Grid>
        </Box>
    );
}
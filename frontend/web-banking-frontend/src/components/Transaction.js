import { Box, Grid, GridItem, Heading, useColorModeValue } from "@chakra-ui/react";
import Sidebar from "./low_level/Sidebar";

export default function Transaction() {
    return (
        <Box minH="100vh" bg={useColorModeValue('gray.50')}>
            <Grid gridTemplateColumns={'20% 80%'}>
                <GridItem>
                    <Sidebar />
                </GridItem>
                <GridItem>
                    <Box p="4">
                        <Heading>
                            New transfer
                        </Heading>
                    </Box>
                </GridItem>
            </Grid>
        </Box>
    );
}
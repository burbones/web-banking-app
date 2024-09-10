import { Box, Heading, useColorModeValue } from "@chakra-ui/react";
import Sidebar from "./low_level/Sidebar";

export default function Transaction() {
    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            <Sidebar />
            <Box p="4">
                <Heading>
                    New transfer
                </Heading>
            </Box>
        </Box>
    );
}
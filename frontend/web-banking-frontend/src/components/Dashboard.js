import { useSelector } from "react-redux";
import Sidebar from "./low_level/Sidebar";
import { Box, Heading, useColorModeValue } from "@chakra-ui/react";

export default function Dashboard() {
    const token = useSelector((state) => state.auth.token);
    console.log(token);

    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            <Sidebar />
            <Box p="4">
                <Heading>
                Dashboard
                </Heading>
            </Box>
        </Box>
    );
}
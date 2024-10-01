import { Box, Button, Flex, Image, useColorModeValue } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DASHBOARD_URL, LOGIN_URL } from "../utils/constants";

import accessDeniedPic from "../img/access_denied.gif";

export default function ForbiddenErrorPage() {
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
        <Box as="main" w="100%" h="90vh" bg={useColorModeValue('gray.50')}>
            <Flex h="100%" flexDirection="column" alignItems="center" justifyContent="center">
                <Image src={accessDeniedPic} alt="access denied" mb="10" />
                
                <Button
                    maxW={{ base: "30%", md: "10%" }}
                    colorScheme='purple'
                    onClick={toHome}
                >
                    Back to home
                </Button>
            </Flex>
        </Box>
    );
}
import { Box, Center, Grid, GridItem, Image } from "@chakra-ui/react";
import SignupForm from "./low_level/SignupForm";
import { useState } from "react";
import CodeCheck from "./low_level/CodeCheck";
import SignupResult from "./low_level/SignupResult";
import backSignup from "../img/signup_back.jpg";
import motivation from "../img/motivation2.png";

export default function Signup() {
    const [curStep, setCurStep] = useState(0);
    const [email, setEmail] = useState(null);
    const [status, setStatus] = useState(false);

    const next = () => {
        setCurStep(curStep + 1);
    }

    const renderStep = (step) => {
        switch (step) {
            case 0:
                return <SignupForm next={next} setEmail={setEmail} />;
            case 1:
                return <CodeCheck next={next} email={email} setStatus={setStatus} />;
            case 2:
                return <SignupResult status={status} />;
        }
    }

    return (
        <Box as='main' w="100%" h="90vh" bgImage={backSignup} bgPosition="center">
            <Grid h="100%" templateColumns={{ base: '100% 0%', md: 'repeat(2, 1fr)' }} gap={{ base: "0", md: "10" }} pt='10'>
                <GridItem h="100%"> 
                    {renderStep(curStep)}
                </GridItem>
                <GridItem>
                    <Center h="100%">
                        <Image src={motivation} boxSize="70%" opacity="90%" borderRadius="full" mr="20" mb="10"/>
                    </Center>
                    
                </GridItem>
            </Grid>
        </Box>
    );
}
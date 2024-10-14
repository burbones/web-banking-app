import { Button, Card, CardBody, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { Link as ReactRouterLink } from 'react-router-dom';

import savings from "../../img/savings.jpg";
import { TRANSFERS_URL } from "../../utils/constants";

export default function BalanceCard( {balance, withButton} ) {
    return <Card 
    fontSize='xl'
    mt={5} mb={10} w={{base: "100%", md: "70%" }}
    overflow='hidden'
    variant='outline'
    direction={{ base: 'column', sm: 'row' }}
    justify="space-between"
    >
        <Stack>
            <CardBody>
                <Heading size="md">
                    Current balance:
                </Heading>
                <Text mt="5">
                    {"$" + balance}
                </Text>
                <Button 
                    as={ReactRouterLink}
                    to={TRANSFERS_URL}
                    display={{ base: `${withButton ? "flex" : "none"}`, md: "none" }}
                    mt="5"
                    colorScheme="purple"
                    maxW="40%"
                >
                    Send money
                </Button>
            </CardBody>
        </Stack>
        <Image display={{ base: "none", md: "block" }} objectFit="cover" src={savings} alt="savings" boxSize="20%" />
    </Card>
}
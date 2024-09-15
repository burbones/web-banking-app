import { Card, CardBody, Heading, Image, Stack, Text } from "@chakra-ui/react";
import savings from "../../img/savings.jpg";

export default function BalanceCard( {balance} ) {
    return <Card 
    fontSize='xl'
    mb={5} w="70%"
    overflow='hidden'
    variant='outline'
    direction={{ base: 'column', sm: 'row' }}
    justify="space-between">
        <Stack>
            <CardBody>
                <Heading size="md">
                    Current balance:
                </Heading>
                <Text mt="5">
                    {"$" + balance}
                </Text>
            </CardBody>
        </Stack>
        <Image objectFit="cover" src={savings} alt="savings" boxSize="20%" />
    </Card>
}
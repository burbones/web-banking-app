import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./low_level/Sidebar";
import { Box, Card, CardBody, CircularProgress, Heading, Image, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios, { HttpStatusCode } from "axios";
import { LOGIN_URL, SERVER_DASHBOARD_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { setUser } from "../authSlice";

import gotMoney from "../img/got_money.png";
import sentMoney from "../img/sent_money2.png";
import savings from "../img/savings.jpg";

export default function Dashboard() {
    const [data, setData] = useState(null);
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(SERVER_DASHBOARD_URL, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then((res) => {
            setData(res.data);
        })
        .catch((err) => {
            if (err.status === HttpStatusCode.Unauthorized) {
                dispatch(setUser({token: ""}));
                navigate(LOGIN_URL);
            }
        })

    }, [token, navigate, dispatch]);

    return (
        <Box minH="100vh" bg={useColorModeValue('gray.50')}>
            <Sidebar />
            <Box p="4"> {!data ? <CircularProgress isIndeterminate color='blue.300' size='20' /> :
                    <>
                        <Heading mb={5}>
                            Dashboard
                        </Heading>
                        <Card 
                            fontSize='xl'
                            mb={5} w="50%"
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
                                        {"$" + data.balance}
                                    </Text>
                                </CardBody>
                            </Stack>
                            <Image objectFit="cover" src={savings} alt="savings" boxSize="20%" />
                        </Card>
                        <TransactionList transactions={data.transactions} />
                    </>
                }
            </Box>
        </Box>
    );
}

function TransactionList(props) {
    return (
        <Box w="50%">
            <Text fontSize='xl'>
                <b>Transactions:</b>
            </Text>
            <TableContainer mt={5} ml={10}>
                <Table>
                    <Thead>
                        <Tr>
                            <Th borderColor='gray.500'></Th>
                            <Th borderColor='gray.500' fontSize="l">Operation type</Th>
                            <Th borderColor='gray.500' fontSize="l">Timestamp</Th>
                            <Th borderColor='gray.500' fontSize="l" isNumeric>Amount</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {props.transactions.map((transaction) => 
                            <TransactionRow transaction={transaction}/>
                        )}
                    </Tbody>
                </Table>
            </TableContainer>
            
        </Box>
    );
}

function TransactionRow({transaction}) {
    const email = useSelector((state) => state.auth.user);
    const isIssuer = transaction.issuer === email;

    return (
        <Tr>
            <Td borderColor='gray.300'>{getPic(transaction.type, isIssuer)}</Td>
            <Td borderColor='gray.300'><b>{getOperationType(transaction.type)}</b></Td>
            <Td borderColor='gray.300'>{stringToDateString(transaction.timestamp)}</Td>
            {getAmountFormatted(transaction, email)}
        </Tr>
    );
}

function stringToDateString(str) {
    return new Date(Date.parse(str)).toDateString();
}

function getAmountFormatted(transaction, email) {
    let color, str;
    const amount = (+transaction.amount / 100).toFixed(2);

    if (transaction.type === "send" && transaction.issuer === email) {
        color = 'red';
        str = `-$${amount}`;
    } else {
        color = 'green';
        str = `+$${amount}`;
    }
    return <Td borderColor='gray.300' color={color} isNumeric>{str}</Td>;
}

function getOperationType(type) {
    if (type === "send") {
        return "Transfer";
    }
}

function getPic(type, isIssuer) {
    if (type === "send" && isIssuer) {
        return <Image src={sentMoney} alt="money pic"></Image>;
    } else {
        return <Image src={gotMoney} alt="money pic"></Image>;
    }
}
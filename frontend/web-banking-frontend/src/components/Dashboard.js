import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./low_level/Sidebar";
import { Box, CircularProgress, Flex, Grid, GridItem, Heading, Image, Select, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios, { HttpStatusCode } from "axios";
import { LOGIN_URL, SERVER_DASHBOARD_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { setUser } from "../authSlice";

import gotMoney from "../img/got_money.png";
import sentMoney from "../img/sent_money2.png";
import BalanceCard from "./low_level/BalanceCard";

export default function Dashboard() {
    const [data, setData] = useState(null);
    const [selection, setSelection] = useState(null);
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (selection !== -1) {
            const params = {
                periodStart: getStart(selection),
            };
            axios.get(SERVER_DASHBOARD_URL, {
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                params,
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
        }
    }, [token, navigate, dispatch, selection]);

    return (
        <Box minH="100vh" bg={useColorModeValue('gray.50')}>
            <Grid gridTemplateColumns={'20% 80%'}>
                <GridItem>
                    <Sidebar />
                </GridItem>
                <GridItem>
                    <Box p="4"> {!data ? <CircularProgress isIndeterminate color='blue.300' size='20' /> :
                        <>
                            <Heading>
                                Dashboard
                            </Heading>
                            <BalanceCard balance={data.balance} />
                            <TransactionList transactions={data.transactions} changeSelection={setSelection} />
                        </>
                    }
                    </Box>
                </GridItem>
            </Grid>
        </Box>
    );
}

function TransactionList(props) {
    return (
        <Box w="70%">
            <Flex justify="space-between">
                <Text fontSize='xl'>
                    <b>Transactions:</b>
                </Text>

                <Select
                    placeholder="Choose period"
                    maxWidth="20%"
                    bg={useColorModeValue('purple.100')}
                    onChange={(e) => props.changeSelection(e.target.value)}
                    defaultValue={-1}
                >
                    <option value='day'>Day</option>
                    <option value='week'>Week</option>
                    <option value='month'>Month</option>
                </Select>
            </Flex>

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
                            <TransactionRow key={transaction.timestamp} transaction={transaction}/>
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

function getStart(selection) {
    let d = new Date();
    d.setUTCHours(0,0,0,0);
    switch (selection) {
        case "day": {
            return d;
        }
        case "week": {
            const day = d.getDay();
            const diff = d.getDate() - day + (day === 0 ? -6 : 1);
            d.setDate(diff);
            return d;
        }
        case "month": {
            return new Date(d.getFullYear(), d.getMonth(), 1);
        }
        default: {
            return d;
        }
    }
}
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./low_level/Sidebar";
import { Box, Button, Center, CircularProgress, Flex, Grid, GridItem, Heading, Image, Select, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from "@chakra-ui/react";
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
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(false);

    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeSelection = (newSelection) => {
        setData({...data, transactions: []});
        setPage(1);
        setSelection(newSelection);
    }

    useEffect(() => {
        if (selection !== -1) {
            console.log("Sending data: " + page);
            const params = {
                page,
                periodStart: getStart(selection),
            };
            axios.get(SERVER_DASHBOARD_URL, {
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                params,
            })
            .then((res) => {
                const newTransactionList = data ? [...data.transactions, ...res.data.transactions] : [];
                
                setData({balance: res.data.balance, transactions: newTransactionList});
                if (res.data.transactions.length === 0) {
                    setLastPage(true);
                } else {
                    setLastPage(false);
                }
            })
            .catch((err) => {
                if (err.status === HttpStatusCode.Unauthorized) {
                    dispatch(setUser({token: ""}));
                    navigate(LOGIN_URL);
                }
            })
        }
    }, [token, navigate, dispatch, page, selection]);

    return (
        <Box minH="100vh" bg={useColorModeValue('gray.50')}>
            <Sidebar />
            <Grid gridTemplateColumns={{base: '0% 100%', md: '20% 80%'}}>
                <GridItem>
                   
                </GridItem>
                <GridItem>
                    <Box p="4"> {!data ? <CircularProgress isIndeterminate color='blue.300' size='20' /> :
                        <>
                            <Heading mt={{ base: "0", md: "50" }}>
                                Hello, {getUserName(user)}!
                            </Heading>
                            <BalanceCard balance={data.balance} withButton={true} />
                            <TransactionList transactions={data.transactions} changeSelection={changeSelection} page={page} setPage={setPage} lastPage={lastPage} />
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
        <Box w={{base: "90vw", md: "70%"}}>
            <Flex justify="space-between">
                <Text fontSize='xl'>
                    <b>Transactions:</b>
                </Text>

                <Select
                    placeholder="Period"
                    maxWidth={{ base: "30%", md: "20%" }}
                    bg={useColorModeValue('purple.100')}
                    onChange={(e) => props.changeSelection(e.target.value)}
                    defaultValue={-1}
                >
                    <option value='day'>Day</option>
                    <option value='week'>Week</option>
                    <option value='month'>Month</option>
                </Select>
            </Flex>
            <TransactionTable transactions={props.transactions} />
            <Center>
                {!props.lastPage ? <Button minW="10%" mb="10" mt="10" colorScheme="purple" onClick={() => {
                    props.setPage(props.page + 1);
                }}>See more</Button> : null}
            </Center>
        </Box>
    );
}

function TransactionTable({transactions}) {
    return (
        <TableContainer mt={5}>
            <Table>
                <Thead>
                    <Tr>
                        <Th borderColor='gray.500'></Th>
                        <Th display={{ base: "none", md: "block" }} borderColor='gray.500' fontSize="l">Operation type</Th>
                        <Th borderColor='gray.500' fontSize="l">Timestamp</Th>
                        <Th borderColor='gray.500' fontSize="l" isNumeric>Amount</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {transactions.map((transaction) => 
                        <TransactionRow key={transaction.timestamp} transaction={transaction}/>
                    )}
                </Tbody>
            </Table>
        </TableContainer>
    );
}

function TransactionRow({transaction}) {
    const email = useSelector((state) => state.auth.user);
    const isIssuer = transaction.issuer === email;

    return (
        <Tr>
            <Td borderColor='gray.300'>{getPic(transaction.type, isIssuer)}</Td>
            <Td display={{ base: "none", md: "table-cell" }} borderColor='gray.300'><b>{getOperationType(transaction.type)}</b></Td>
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

function getUserName(email) {
    return email.split("@")[0];
}
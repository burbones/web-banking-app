import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./low_level/Sidebar";
import { Box, CircularProgress, Heading, Image, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios, { HttpStatusCode } from "axios";
import { LOGIN_URL, SERVER_DASHBOARD_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { setUser } from "../authSlice";

import gotMoney from "../img/got_money.png";

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
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            <Sidebar />
            <Box p="4"> {!data ? <CircularProgress isIndeterminate color='green.300' size='20' /> :
                    <>
                        <Heading mb={5}>
                            Dashboard
                        </Heading>
                        <Text fontSize='xl' mb={5}>
                            <b>Current balance:</b> {"$" + data.balance}
                        </Text>
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
                            <Th></Th>
                            <Th>Operation type</Th>
                            <Th>Timestamp</Th>
                            <Th isNumeric>Amount</Th>
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
    return (
        <Tr>
            <Td><Image src={gotMoney} alt="money pic"></Image></Td>
            <Td><b>{transaction.type}</b></Td>
            <Td>{stringToDateString(transaction.timestamp)}</Td>
            {getAmountFormatted(transaction)}
        </Tr>
    );
}

function stringToDateString(str) {
    return new Date(Date.parse(str)).toDateString();
}

function getAmountFormatted(transaction) {
    let color, str;
    const amount = (+transaction.amount / 100).toFixed(2);

    if (transaction.type === "send") {
        color = 'red';
        str = `-$${amount}`;
    } else {
        color = 'green';
        str = `+$${amount}`;
    }
    return <Td color={color} isNumeric>{str}</Td>;
}
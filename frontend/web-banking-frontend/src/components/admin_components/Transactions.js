import { Box, CircularProgress, Grid, GridItem, Heading, Select, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useColorModeValue } from "@chakra-ui/react";
import { adminSidebarItems, LOGIN_URL, SERVER_TRANSACTIONS_URL } from "../../utils/constants";
import Sidebar from "../low_level/Sidebar";
import { getOperationType } from "../Dashboard";
import { useEffect, useState } from "react";
import axios, { HttpStatusCode } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setUser } from "../../authSlice";
import ForbiddenErrorPage from "../ForbiddenErrorPage";

export default function Transanctions() {
    const [transactions, setTransactions] = useState(null);
    const [isForbidden, setIsForbidden] = useState(false);

    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const location = useLocation();

    const [chosenUser, setChosenUser] = useState(!location.state ? null : location.state.user);
    console.log(chosenUser);

    useEffect(() => {
        const params = {
            user: chosenUser,
        };

        axios.get(SERVER_TRANSACTIONS_URL, {
            headers: {
                'Authorization': 'Bearer ' + token
            },
            params,
        })
        .then((res) => {
            setTransactions(res.data.transactions);
        })
        .catch((err) => {
            if (err.status === HttpStatusCode.Unauthorized) {
                dispatch(setUser({token: ""}));
                navigate(LOGIN_URL);
            } else if (err.status === HttpStatusCode.Forbidden) {
                setIsForbidden(true);
            }
        })
    }, [dispatch, navigate, token, chosenUser]);

    const baseColor = useColorModeValue('gray.50');
    const selectColor = useColorModeValue('purple.100');

    const content = 
        <Box minH="100vh" bg={baseColor}>
            {isForbidden ? <ForbiddenErrorPage /> : 
                (!transactions ? <CircularProgress isIndeterminate color='blue.300' size='20' /> :
            <>
                <Sidebar itemList={adminSidebarItems} />
                <Grid gridTemplateColumns={{base: '0% 100%', md: '20% 80%'}}>
                    <GridItem>
                    
                    </GridItem>
                    <GridItem>
                        <Box p="4">
                            <Heading mt={{ base: "0", md: "50" }} mb="10">
                                Transactions
                            </Heading>
                            <Select
                                placeholder="All users"
                                maxWidth={{ base: "30%", md: "20%" }}
                                bg={selectColor}
                                onChange={(e) => setChosenUser(e.target.value)}
                                defaultValue={chosenUser}
                            >
                                <option value='asd2@coolmail.xyz'>asd2@coolmail.xyz</option>
                                <option value='test@test.test'>test@test.test</option>
                            </Select>
                            <AdminTransactionTable transactions={transactions}/>
                        </Box>
                    </GridItem>
                </Grid>
            </>
            )}
        </Box>;

    return content;
}

function AdminTransactionTable({transactions}) {
    return (
        <TableContainer mt={5} mr={5}>
            <Table>
                <Thead>
                    <Tr>
                        <Th display={{ base: "none", md: "block" }} borderColor='gray.500' fontSize="l">Operation type</Th>
                        <Th borderColor='gray.500' fontSize="l">Timestamp</Th>
                        <Th borderColor='gray.500' fontSize="l">Issuer</Th>
                        <Th borderColor='gray.500' fontSize="l">Acquirer</Th>
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

    return (
        <Tr>
            <Td w="5%" display={{ base: "none", md: "table-cell" }} borderColor='gray.300'><b>{getOperationType(transaction.type)}</b></Td>
            <Td borderColor='gray.300'>{new Date(Date.parse(transaction.timestamp)).toUTCString()}</Td>
            <Td w="20%" borderColor='gray.300'>{transaction.issuer}</Td>
            <Td w="20%" borderColor='gray.300'>{transaction.acquirer}</Td>
            <Td w="5%" borderColor='gray.300' isNumeric>{(+transaction.amount / 100).toFixed(2)}$</Td>
        </Tr>
    );
}
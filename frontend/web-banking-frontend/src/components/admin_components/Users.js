import { Box, Button, CircularProgress, Grid, GridItem, Heading, IconButton, Input, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from "@chakra-ui/react";
import { adminSidebarItems, LOGIN_URL, SERVER_USERS_URL } from "../../utils/constants";
import Sidebar from "../low_level/Sidebar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios, { HttpStatusCode } from "axios";
import { setUser } from "../../authSlice";
import { useNavigate } from "react-router-dom";
import ForbiddenErrorPage from "../ForbiddenErrorPage";
import { FiTrash2 } from "react-icons/fi";

export default function Users() {
    const [users, setUsers] = useState(null);
    const [isForbidden, setIsForbidden] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        const searchValue = e.target.value;
        setSearchValue(searchValue);
    }

    const filterUsers = (list) => {
        if (list) {
            return list.filter((user) => user.email.toLowerCase().includes(searchValue.toLowerCase()));
        }
    }
    
    useEffect(() => {
        axios.get(SERVER_USERS_URL, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then((res) => {
            console.log(res.data);
            setUsers(res.data.users);
        })
        .catch((err) => {
            if (err.status === HttpStatusCode.Unauthorized) {
                dispatch(setUser({token: ""}));
                navigate(LOGIN_URL);
            } else if (err.status === HttpStatusCode.Forbidden) {
                setIsForbidden(true);
            }
        })
    }, [dispatch, navigate, token]);

    const baseColor = useColorModeValue('gray.50');

    const content =
        <Box minH="100vh" bg={baseColor}>
                {isForbidden ? <ForbiddenErrorPage /> : 
                    (!users ? <CircularProgress isIndeterminate color='blue.300' size='20' /> :
                <>
                    <Sidebar itemList={adminSidebarItems} />
                    <Grid gridTemplateColumns={{base: '0% 100%', md: '20% 80%'}}>
                        <GridItem>
                        
                        </GridItem>
                        <GridItem>
                            <Box p="4">
                                <Heading mt={{ base: "0", md: "50" }} mb="10">
                                    Hello, admin!
                                </Heading>
                                <Text fontSize='xl'>
                                    <b>Users:</b>
                                </Text>
                                <Input 
                                    variant='flushed' placeholder='Type to find users' mt='5' w='50%'
                                    value={searchValue}
                                    onChange={handleSearchChange}
                                 />
                                <UserList users={filterUsers(users)} />
                            </Box>
                        </GridItem>
                    </Grid>
                </>
                
            )}
        </Box>

    return content;
}

function UserList( {users} ) {
    return (
        <TableContainer mt={5} mr={5}>
            <Table>
                <Thead>
                    <Tr>
                        <Th borderColor='gray.500'></Th>
                        <Th borderColor='gray.500' fontSize="l">Email</Th>
                        <Th borderColor='gray.500' fontSize="l">Creation time</Th>
                        <Th borderColor='gray.500' fontSize="l">Is active</Th>
                        <Th borderColor='gray.500' fontSize="l">Balance</Th>
                        <Th borderColor='gray.500' fontSize="l">Transanctions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {users.map((user) => 
                        <UserRow key={user._id} user={user}/>
                    )}
                </Tbody>
            </Table>
        </TableContainer>
    );
}

function UserRow( {user} ) {
    return (
        <Tr>
            <Td borderColor='gray.300'><IconButton icon={<FiTrash2 />} /></Td>
            <Td borderColor='gray.300'>{user.email}</Td>
            <Td borderColor='gray.300'>{new Date(Date.parse(user.creationTime)).toUTCString()}</Td>
            <Td borderColor='gray.300'>{user.isActive ? "True" : "False"}</Td>
            <Td borderColor='gray.300'>${user.balance / 100}</Td>
            <Td borderColor='gray.300'>
                <Button colorScheme="purple" variant="link">
                    See transactions
                </Button>
            </Td>
        </Tr>
    );
}
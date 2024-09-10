import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./low_level/Sidebar";
import { Box, CircularProgress, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios, { HttpStatusCode } from "axios";
import { LOGIN_URL, SERVER_DASHBOARD_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { setUser } from "../authSlice";

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
        <>
            <Text fontSize='xl'>
                <b>Transactions:</b>
                {props.transactions.map((transaction) => <p>{transaction.type}</p>)}
            </Text>
        </>
    );

}
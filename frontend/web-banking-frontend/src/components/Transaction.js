import { Box, CircularProgress, Flex, Grid, GridItem, Heading, Image, useColorModeValue } from "@chakra-ui/react";
import Sidebar from "./low_level/Sidebar";
import BalanceCard from "./low_level/BalanceCard";
import { useEffect, useState } from "react";
import axios, { HttpStatusCode } from "axios";
import { LOGIN_URL, SERVER_DASHBOARD_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../authSlice";
import TransactionForm from "./low_level/TransactionForm";

import freshPic from "../img/fresh_start.png";

export default function Transaction() {
    const [balance, setBalance] = useState(null);
    const [isRefreshNeeded, setIsRefreshNeeded] = useState(true);
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isRefreshNeeded) {
            const params = {
                periodStart: new Date(),
            };
            axios.get(SERVER_DASHBOARD_URL, {
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                params,
            })
            .then((res) => {
                setBalance(res.data.balance);
            })
            .catch((err) => {
                if (err.status === HttpStatusCode.Unauthorized) {
                    dispatch(setUser({token: ""}));
                    navigate(LOGIN_URL);
                }
            })

            setIsRefreshNeeded(false);
        }

    }, [token, navigate, dispatch, isRefreshNeeded]);

    return (
        <Box minH="100vh" bg={useColorModeValue('gray.50')}>
            <Grid gridTemplateColumns={'20% 80%'}>
                <GridItem>
                    <Sidebar />
                </GridItem>
                <GridItem>
                    <Box p="4"> {balance === null ? <CircularProgress isIndeterminate color='blue.300' size='20' /> :
                        <>
                            <Heading>
                                New transfer
                            </Heading>
                            <BalanceCard balance={balance}/>
                            <Grid gridTemplateColumns={'50% 50%'}>
                                <GridItem>
                                    <TransactionForm setIsRefreshNeeded={setIsRefreshNeeded} />
                                </GridItem>
                                <GridItem>
                                    <Flex h="100%" direction="column" justify="end">
                                        <Image src={freshPic} alt="logo" w="50%" opacity="0.8"/>
                                    </Flex>
                                </GridItem>
                            </Grid>
                        </>
                    }
                    </Box>
                </GridItem>
            </Grid>
        </Box>
    );
}
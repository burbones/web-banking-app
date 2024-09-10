import React from 'react';
import {
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
} from '@chakra-ui/react';
import {
  FiHome,
  FiLogOut,
} from 'react-icons/fi';
import { FaMoneyBillTransfer } from 'react-icons/fa6';
import { Link as ReactRouterLink } from 'react-router-dom';
import { DASHBOARD_URL, LOGIN_URL, TRANSFERS_URL } from '../../utils/constants';

const LinkItems = [
  { name: 'Dashboard', icon: FiHome, to: DASHBOARD_URL },
  { name: 'Transfer money', icon: FaMoneyBillTransfer, to: TRANSFERS_URL },
  { name: 'Log out', icon: FiLogOut, to: LOGIN_URL },
];

export default function Sidebar() {
  
  return (
    <>
      <Drawer
        isOpen="true"
        placement="right"
      >
        <DrawerContent>
          <SidebarContent />
        </DrawerContent>
      </Drawer>
    </>
  )
}

const SidebarContent = ({onClose, ...rest} ) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between" mt="50">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            Navigation
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} to={link.to}>
            {link.name}
        </NavItem>
      ))}
    </Box>
  )
}

const NavItem = ({ icon, to, children, ...rest }) => {
  return (
    <Box
      as={ReactRouterLink}
      to={to} 
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'purple.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  )
}
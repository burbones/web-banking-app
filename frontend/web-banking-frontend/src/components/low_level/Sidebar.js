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
  useDisclosure,
  IconButton,
} from '@chakra-ui/react';
import {
  FiHome,
  FiLogOut,
  FiMenu,
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  return (
    <>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
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

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('gray.50', 'gray.900')}
      justifyContent="flex-start"
      {...rest}>
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />
    </Flex>
  )
}
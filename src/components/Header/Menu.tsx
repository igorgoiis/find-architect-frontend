import {
  Avatar,
  Box,
  Flex,
  Icon,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Menu as MenuChakra,
  useBreakpointValue,
} from '@chakra-ui/react';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { useAuth } from '../../hooks/useAuth';

export function Menu() {
  const { logout, user } = useAuth();

  const isWideVersion = useBreakpointValue({ base: false, lg: true });

  return (
    <Flex>
      <MenuChakra>
        <MenuButton
          px="4"
          py="2"
          borderRadius="md"
          borderWidth="1px"
          borderColor="gray.700"
          _hover={{ bgColor: 'gray.700' }}
          _expanded={{ bgColor: 'gray.700' }}
        >
          <Flex align="center">
            {isWideVersion && (
              <Box mr="4" textAlign="right">
                <Text>{user?.name}</Text>
                <Text color="gray.300">{user?.email}</Text>
              </Box>
            )}
            <Avatar size="md" name={user?.name} />
          </Flex>
        </MenuButton>
        <MenuList>
          <MenuItem onClick={logout}>
            <Icon as={RiLogoutBoxRLine} fontSize="20" mr="4" />
            Sair
          </MenuItem>
        </MenuList>
      </MenuChakra>
    </Flex>
  );
}

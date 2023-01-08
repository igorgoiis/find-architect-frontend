import {
  Avatar,
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import {
  RiNotificationLine,
  RiSearchLine,
  RiUserAddLine,
} from 'react-icons/ri';

export function Header() {
  return (
    <Flex
      as="header"
      w="100%"
      maxW={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
      justify="space-between"
    >
      <Flex>
        <Heading fontSize="3xl" fontWeight="bold" letterSpacing="tight">
          ArquiMatch
          <Text as="span" ml="1" color="blue.300">
            .
          </Text>
        </Heading>
      </Flex>

      <Flex
        as="label"
        flex="1"
        py="4"
        px="8"
        ml="6"
        maxW={400}
        alignSelf="center"
        alignItems="center"
        color="gray.200"
        position="relative"
        bg="gray.700"
        borderRadius="full"
      >
        <Input
          color="gray.50"
          variant="unstyled"
          px="4"
          mr="4"
          placeholder="Buscar arquiteto"
          colorScheme="blue"
        />
        <Icon as={RiSearchLine} fontSize="20" />
      </Flex>

      <Flex align="center">
        <HStack
          spacing="8"
          mx="8"
          pr="8"
          py="1"
          color="gray.300"
          borderRightWidth={1}
          borderColor="gray.700"
        >
          <Icon as={RiNotificationLine} fontSize="20" />
          <Icon as={RiUserAddLine} fontSize="20" />
        </HStack>

        <Flex align="center">
          <Box mr="4" textAlign="right">
            <Text>Igor Gois</Text>
            <Text color="gray.300">ig_orgabriel@hotmail.com</Text>
          </Box>
          <Avatar
            size="md"
            name="Igor Gois"
            src="https://github.com/igorgoiis.png"
          />
        </Flex>
      </Flex>
    </Flex>
  );
}

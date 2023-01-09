import { Flex, Heading, Text } from '@chakra-ui/react';

export function Logo() {
  return (
    <Flex>
      <Heading fontSize="3xl" fontWeight="bold" letterSpacing="tight">
        ArquiMatch
        <Text as="span" ml="1" color="blue.300">
          .
        </Text>
      </Heading>
    </Flex>
  );
}

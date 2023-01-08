import { Box, Icon, Link, Stack, Text } from '@chakra-ui/react';
import { RiDraftLine, RiUserLine } from 'react-icons/ri';

export function Sidebar() {
  return (
    <Box as="aside" w="64" mr="8">
      <Stack spacing="12" align="flex-start">
        <Box>
          <Text fontWeight="bold" color="gray.400" fontSize="small">
            PROFISSIONAIS
          </Text>
          <Stack spacing="4" mt="8" align="stretch">
            <Link display="flex" alignItems="center">
              <Icon as={RiUserLine} fontSize="20" />
              <Text ml="4" fontWeight="medium">
                Arquitetos
              </Text>
            </Link>
          </Stack>
        </Box>
        <Box>
          <Text fontWeight="bold" color="gray.400" fontSize="small">
            Solicitações
          </Text>
          <Stack spacing="4" mt="8" align="stretch">
            <Link display="flex" alignItems="center">
              <Icon as={RiDraftLine} fontSize="20" />
              <Text ml="4" fontWeight="medium">
                Suas Solicitações
              </Text>
            </Link>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

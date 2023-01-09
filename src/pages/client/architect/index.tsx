import { Flex, SimpleGrid, Spinner, Text } from '@chakra-ui/react';
import Head from 'next/head';
import { CardArquitect } from '../../../components/CardArchitect';
import { Header } from '../../../components/Header';
import { Sidebar } from '../../../components/Sidebar';
import {
  Role,
  useGetUserByRoleQuery,
} from '../../../graphql/generated/graphql';

export default function ArchitectList() {
  const { data, loading } = useGetUserByRoleQuery({
    variables: { role: Role.Architect },
  });

  return (
    <>
      <Head>
        <title>Dashboard | Find Architect</title>
      </Head>
      <Flex direction="column" h="100vh">
        <Header />

        <Flex w="100%" my="6" maxW={1480} mx="auto" px="6" mt="10">
          <Sidebar />

          {loading ? (
            <Flex flex="1" justify="center" align="center">
              <Spinner size="xl" color="blue.400" thickness="1.5px" />
            </Flex>
          ) : data ? (
            <SimpleGrid
              flex="1"
              gap="8"
              columns={[null, 1, 1, 2, 3]}
              alignItems="flex-start"
            >
              {data?.userByRole.map((value) => (
                <CardArquitect key={value.id} architect={value} />
              ))}
            </SimpleGrid>
          ) : (
            <Flex flex="1" justify="center" color="gray.500" fontSize="20">
              <Text>Não encontramos nenhum arquiteto.</Text>
            </Flex>
          )}
        </Flex>
      </Flex>
    </>
  );
}

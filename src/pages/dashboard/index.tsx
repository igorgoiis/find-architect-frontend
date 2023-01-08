import { Flex, SimpleGrid } from '@chakra-ui/react';
import Head from 'next/head';
import { CardArquitect } from '../../components/CardArchitect';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { Role, useGetUserByRoleQuery } from '../../graphql/generated/graphql';

export default function Dashboard() {
  const { data, loading } = useGetUserByRoleQuery({
    variables: { role: Role.Architect },
  });

  console.log({ data, loading });

  return (
    <>
      <Head>
        <title>Dashboard | Find Architect</title>
      </Head>
      <Flex direction="column" h="100vh">
        <Header />

        <Flex w="100%" my="6" maxW={1480} mx="auto" px="6" mt="10">
          <Sidebar />

          <SimpleGrid
            flex="1"
            gap="8"
            minChildWidth="320px"
            alignItems="flex-start"
          >
            {data?.userByRole.map((value) => (
              <CardArquitect key={value.id} architect={value} />
            ))}
          </SimpleGrid>
        </Flex>
      </Flex>
    </>
  );
}

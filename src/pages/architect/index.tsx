import { Flex, SimpleGrid, Spinner } from '@chakra-ui/react';
import Head from 'next/head';
import { CardRequestServiceView } from '../../components/CardRequestServiceView';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { useGetAllServiceRequestQuery } from '../../graphql/generated/graphql';
import { useAuth } from '../../hooks/useAuth';

export default function ArchitectHome() {
  const { user } = useAuth();
  const { data, loading } = useGetAllServiceRequestQuery({
    variables: { id: user?.id as string },
  });
  return (
    <>
      <Head>
        <title>Solicitações | Find Architect</title>
      </Head>
      <Flex direction="column" h="100vh">
        <Header />

        <Flex w="100%" my="6" maxW={1480} mx="auto" px="6" mt="10">
          <Sidebar />

          {loading ? (
            <Flex flex="1" justify="center" align="center">
              <Spinner size="xl" color="blue.400" thickness="1.5px" />
            </Flex>
          ) : (
            <SimpleGrid
              flex="1"
              gap="8"
              columns={[null, 1, 1, 2, 3]}
              alignItems="center"
              justifyItems="center"
            >
              {data?.findAllServiceRequest.map((request) => (
                <CardRequestServiceView key={request.id} request={request} />
              ))}
            </SimpleGrid>
          )}
        </Flex>
      </Flex>
    </>
  );
}

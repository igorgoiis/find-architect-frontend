import {
  Badge,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import {
  StatusService,
  useDeleteServiceRequestMutation,
  useGetAllServiceRequestQuery,
  useGetUserByIdQuery,
} from '../../graphql/generated/graphql';
import { useAuth } from '../../hooks/useAuth';
import { IUser } from '../../shared/models/user.model';

export default function ListRequestService() {
  const [architects, setArchitects] = useState<IUser[]>([]);
  const [requestIdDelete, setRequestIdDelete] = useState<string | null>(null);
  const router = useRouter();
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<any>();
  const { refetch } = useGetUserByIdQuery({
    variables: { id: '' },
    refetchWritePolicy: 'overwrite',
    onCompleted: (data) =>
      setArchitects((oldState) => [...oldState, data.userById]),
  });
  const {
    data,
    loading,
    called,
    refetch: refetchSetviceRequest,
  } = useGetAllServiceRequestQuery({
    variables: { id: user?.id as string },
    refetchWritePolicy: 'overwrite',
  });
  const [deleteServiceRequest] = useDeleteServiceRequestMutation();

  useEffect(() => {
    if (called && !loading) {
      data?.findAllServiceRequest.map((request) => {
        refetch({ id: request.aRequestId as string });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [called, loading]);

  function renderStatus(status: StatusService) {
    const colorScheme =
      status === StatusService.Requested
        ? 'yellow'
        : status === StatusService.Accepted
        ? 'green'
        : 'red';
    return (
      <Badge
        ml="1"
        px="2"
        py="1"
        fontSize="16"
        fontWeight={400}
        colorScheme={colorScheme}
        textTransform="capitalize"
      >
        {status === StatusService.Requested && 'Solicitada'}
        {status === StatusService.Accepted && 'Aceita'}
        {status === StatusService.Declined && 'Recusada'}
      </Badge>
    );
  }

  function renderAlertDialog() {
    return (
      <AlertDialog
        isOpen={isOpen}
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Deseja exluir a solicitação?
            </AlertDialogHeader>

            <AlertDialogBody>
              Você tem certeza? Esta ação não poderá ser desfeita!
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button
                colorScheme="red"
                onClick={() => handleDeleteRequest()}
                ml={3}
              >
                Excluir
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    );
  }

  function handleConfirmeDeleteRequest(id: string) {
    onOpen();
    setRequestIdDelete(id);
  }

  async function handleDeleteRequest() {
    onClose();
    try {
      await deleteServiceRequest({
        variables: { id: requestIdDelete as string },
      });
      refetchSetviceRequest({ id: user?.id as string });
    } catch (error) {
      console.log(error);
    }
  }

  function handleRequest(id: string) {
    router.replace(`request/edit/${id}`);
  }

  return (
    <>
      <Head>
        <title>Solicitações de serviços | Find Architect</title>
      </Head>
      <Flex direction="column" h="100vh">
        <Header />

        <Flex w="100%" my="6" maxW={1480} mx="auto" px="6" mt="10">
          <Sidebar />

          <Flex flex="1" justify="center">
            <TableContainer flex="1">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Título</Th>
                    <Th>Descrição</Th>
                    <Th>Status</Th>
                    <Th>Arquiteto</Th>
                    <Th />
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.findAllServiceRequest.map((request) => (
                    <Tr key={request.id}>
                      <Td>{request.title}</Td>
                      <Td>{request.description}</Td>
                      <Td>{renderStatus(request.status)}</Td>
                      <Td>
                        {
                          architects.find(
                            (arc) => arc.id === request.aRequestId,
                          )?.name
                        }
                      </Td>
                      <Td textAlign="end">
                        <Button
                          iconSpacing="-0.8"
                          leftIcon={<RiDeleteBinLine fontSize="20" />}
                          bgColor="transparent"
                          _hover={{ bgColor: 'red.600' }}
                          mr="4"
                          onClick={() =>
                            handleConfirmeDeleteRequest(request.id)
                          }
                        />
                        <Button
                          iconSpacing="-0.8"
                          leftIcon={<RiEdit2Line fontSize="20" />}
                          bgColor="transparent"
                          _hover={{ bgColor: 'blue.500' }}
                          onClick={() => handleRequest(request.id)}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            {renderAlertDialog()}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

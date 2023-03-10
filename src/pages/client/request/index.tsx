import {
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
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri';
import { BadgeStatus } from '../../../components/BadgeStatus';
import { Header } from '../../../components/Header';
import { Sidebar } from '../../../components/Sidebar';
import {
  useDeleteServiceRequestMutation,
  useGetAllServiceRequestQuery,
  useGetUserByIdQuery,
} from '../../../graphql/generated/graphql';
import { useAuth } from '../../../hooks/useAuth';
import { IUser } from '../../../shared/models/user.model';

export default function ListRequestService() {
  const [architects, setArchitects] = useState<IUser[]>([]);
  const [requestIdDelete, setRequestIdDelete] = useState<string | null>(null);
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
              Deseja exluir a solicita????o?
            </AlertDialogHeader>

            <AlertDialogBody>
              Voc?? tem certeza? Esta a????o n??o poder?? ser desfeita!
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

  return (
    <>
      <Head>
        <title>Solicita????es de servi??os | Find Architect</title>
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
                    <Th>T??tulo</Th>
                    <Th>Descri????o</Th>
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
                      <Td>
                        <BadgeStatus status={request.status} />
                      </Td>
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
                        <Link href={`request/edit/${request.id}`} passHref>
                          <Button
                            as="a"
                            iconSpacing="-0.8"
                            leftIcon={<RiEdit2Line fontSize="20" />}
                            bgColor="transparent"
                            _hover={{ bgColor: 'blue.500' }}
                          />
                        </Link>
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

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Select,
  Spinner,
  Stack,
  Text,
  Textarea,
  ToastId,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Header } from '../../../components/Header';
import { Sidebar } from '../../../components/Sidebar';
import {
  StatusService,
  useDeleteServiceRequestMutation,
  useGetOneServiceRequestQuery,
  useGetUserByIdQuery,
  useUpdateServiceRequestMutation,
} from '../../../graphql/generated/graphql';
import { Input } from '../../../components/Form/Input';
import React, { useState } from 'react';
import { BadgeStatus } from '../../../components/BadgeStatus';
import { RiDeleteBinLine } from 'react-icons/ri';

export default function RequestServiceView() {
  // States
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<StatusService>(StatusService.Requested);
  const [isChange, setIsChange] = useState(false);

  // hooks
  const router = useRouter();
  const toast = useToast();
  const toastIdRef = React.useRef<ToastId>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<any>();

  // Query params
  const { id: requestId } = router.query;

  // Hooks Codegen
  const { data: requestService, loading: loadingRequestService } =
    useGetOneServiceRequestQuery({
      variables: { id: (requestId as string) ?? '' },
      onCompleted: (data) => {
        setTitle(data.findOneServiceRequest.title);
        setDescription(data.findOneServiceRequest.description);
        setStatus(data.findOneServiceRequest.status);
      },
    });
  const { data: client, loading: loadingClient } = useGetUserByIdQuery({
    variables: {
      id: (requestService?.findOneServiceRequest.cRequestId as string) ?? '',
    },
  });
  const [updateServiceRequest, { loading }] = useUpdateServiceRequestMutation();
  const [deleteServiceRequest] = useDeleteServiceRequestMutation();

  // Methods
  async function handleChangeStatusService(status: StatusService) {
    setStatus(status);
    setIsChange(false);
    try {
      await updateServiceRequest({
        variables: { id: requestId as string, data: { status } },
      });

      toastIdRef.current = toast({
        title: 'O status da solicitação foi alterado.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toastIdRef.current = toast({
        title:
          'Ocorreu um erro ao tentar alterar o status da solicitação, por favor tente novamente.',
        status: 'error',
        duration: 8000,
        isClosable: true,
      });
    }
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
                onClick={() => handleDeleteServiceRequest()}
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

  async function handleDeleteServiceRequest() {
    onClose();
    try {
      await deleteServiceRequest({
        variables: {
          id: (requestService?.findOneServiceRequest.id as string) ?? '',
        },
      });

      toastIdRef.current = toast({
        title: 'Solicitação de serviço deletada.',
        description: 'A solicitação de serviço foi deletada com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      router.push('/architect');
    } catch (error) {
      toastIdRef.current = toast({
        title: 'Erro ao tentar deletar a solicitação.',
        description:
          'Não conseguimos deletar a solicitação de serviço, por favor tente novamente mais tarde.',
        status: 'error',
        duration: 7000,
        isClosable: true,
      });
    }
  }

  return (
    <>
      <Head>
        <title>Análise de solicitação | Find Architect</title>
      </Head>
      <Flex direction="column" h="100vh">
        <Header />

        <Flex w="100%" my="6" maxW={1480} mx="auto" px="6" mt="10">
          <Sidebar />

          <Flex flex="1" justify="center">
            {loadingRequestService || loadingClient ? (
              <Flex flex="1" justify="center" align="center">
                <Spinner size="xl" color="blue.400" thickness="1.5px" />
              </Flex>
            ) : (
              <Stack spacing="6" flex="1" maxW="700" px="8" direction="column">
                {client && (
                  <Box mb="8">
                    <Text fontSize="18">
                      Solicitante: {client.userById.name}
                    </Text>
                  </Box>
                )}

                <Input
                  name="title"
                  type="text"
                  value={title}
                  label="Título"
                  placeholder="Título do projeto"
                  isDisabled
                  _disabled={{ color: 'gray.300', cursor: 'not-allowed' }}
                />

                <FormControl>
                  <FormLabel htmlFor="description">Descrição</FormLabel>
                  <Textarea
                    name="description"
                    id="description"
                    value={description}
                    placeholder="Conte um pouco sobre o projeto"
                    size="lg"
                    isDisabled
                    _disabled={{ color: 'gray.300', cursor: 'not-allowed' }}
                  />
                </FormControl>

                <Flex align="center">
                  <Flex align="center" flex="1">
                    {isChange ? (
                      <FormControl w="100%" maxW="140">
                        <Select
                          name="status"
                          value={status}
                          onChange={(event) =>
                            handleChangeStatusService(
                              event.target.value as StatusService,
                            )
                          }
                        >
                          <option value={StatusService.Requested}>
                            Solicitada
                          </option>
                          <option value={StatusService.Accepted}>
                            Aceitar
                          </option>
                          <option value={StatusService.Declined}>
                            Recusar
                          </option>
                        </Select>
                      </FormControl>
                    ) : (
                      <BadgeStatus
                        w="100%"
                        maxW="140"
                        textAlign="center"
                        status={status}
                        onClick={() => setIsChange(true)}
                        _hover={{ cursor: 'pointer' }}
                      />
                    )}
                    {loading && (
                      <Spinner
                        ml="4"
                        size="sm"
                        color="blue.400"
                        thickness="1.5px"
                      />
                    )}
                  </Flex>
                  <Flex flex="1" align="center" justify="flex-end">
                    <Button
                      colorScheme="red"
                      leftIcon={<Icon as={RiDeleteBinLine} />}
                      onClick={onOpen}
                    >
                      Excluir
                    </Button>
                  </Flex>
                </Flex>
              </Stack>
            )}
          </Flex>
        </Flex>
      </Flex>
      {renderAlertDialog()}
    </>
  );
}

import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Select,
  Spinner,
  Stack,
  Text,
  Textarea,
  ToastId,
  useToast,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Header } from '../../../components/Header';
import { Sidebar } from '../../../components/Sidebar';
import {
  StatusService,
  useGetOneServiceRequestQuery,
  useGetUserByIdQuery,
  useUpdateServiceRequestMutation,
} from '../../../graphql/generated/graphql';
import { Input } from '../../../components/Form/Input';
import React, { useState } from 'react';
import { BadgeStatus } from '../../../components/BadgeStatus';

export default function RequestServiceView() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<StatusService>(StatusService.Requested);
  const [isChange, setIsChange] = useState(false);

  const router = useRouter();
  const toast = useToast();
  const toastIdRef = React.useRef<ToastId>();

  const { id: requestId } = router.query;

  const { data: requestService } = useGetOneServiceRequestQuery({
    variables: { id: (requestId as string) ?? '' },
    onCompleted: (data) => {
      setTitle(data.findOneServiceRequest.title);
      setDescription(data.findOneServiceRequest.description);
      setStatus(data.findOneServiceRequest.status);
    },
  });
  const { data: client } = useGetUserByIdQuery({
    variables: {
      id: (requestService?.findOneServiceRequest.cRequestId as string) ?? '',
    },
  });

  const [updateServiceRequest, { loading }] = useUpdateServiceRequestMutation();

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
            <Stack spacing="6" flex="1" maxW="700" px="8" direction="column">
              {client && (
                <Box mb="8">
                  <Text fontSize="18">Solicitante: {client.userById.name}</Text>
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
                      <option value={StatusService.Accepted}>Aceitar</option>
                      <option value={StatusService.Declined}>Recusar</option>
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
            </Stack>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

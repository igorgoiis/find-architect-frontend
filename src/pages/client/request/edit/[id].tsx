import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Stack,
  Text,
  Textarea,
  ToastId,
  useToast,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Header } from '../../../components/Header';
import { Sidebar } from '../../../components/Sidebar';
import {
  StatusService,
  useGetOneServiceRequestQuery,
  useGetUserByIdQuery,
  useUpdateServiceRequestMutation,
} from '../../../graphql/generated/graphql';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../../../components/Form/Input';
import { FieldError, SubmitHandler } from 'react-hook-form/dist/types';
import { RiSendPlaneFill } from 'react-icons/ri';
import React from 'react';

interface IRequestServiceForm {
  title: string;
  description: string;
  status: StatusService;
}

const requestFormSchema = yup.object().shape({
  title: yup.string().required('Título é obrigatório.'),
  description: yup.string().required('Descrição é obrigatória.'),
  status: yup.string().optional().notRequired(),
});

export default function EditRequestService() {
  const router = useRouter();
  // const { user } = useAuth();
  const [updateRequest] = useUpdateServiceRequestMutation();
  const toast = useToast();
  const toastIdRef = React.useRef<ToastId>();

  const { id: requestId } = router.query;

  const { data: request } = useGetOneServiceRequestQuery({
    variables: { id: (requestId as string) ?? '' },
    onCompleted: (data) => {
      reset({
        title: data.findOneServiceRequest.title,
        description: data.findOneServiceRequest.description,
      }),
        refetch({ id: data.findOneServiceRequest.id });
    },
  });

  const { data: architect, refetch } = useGetUserByIdQuery({
    variables: { id: '' },
    refetchWritePolicy: 'overwrite',
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IRequestServiceForm>({
    resolver: yupResolver(requestFormSchema),
  });

  const handleSendRequest: SubmitHandler<IRequestServiceForm> = async (
    value,
    e,
  ) => {
    e?.preventDefault();

    try {
      await updateRequest({
        variables: {
          id: (request?.findOneServiceRequest.id as string) ?? '',
          data: {
            ...value,
          },
        },
      });

      toastIdRef.current = toast({
        title: 'Solicitação de serviço editada.',
        description: 'Solicitação de serviço enviada com sucesso!',
        status: 'success',
        duration: 6000,
      });

      router.back();
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <>
      <Head>
        <title>Dashboard | Find Architect</title>
      </Head>
      <Flex direction="column" h="100vh">
        <Header />

        <Flex w="100%" my="6" maxW={1480} mx="auto" px="6" mt="10">
          <Sidebar />

          <Flex flex="1" justify="center">
            <Stack
              as="form"
              spacing="6"
              flex="1"
              maxW="700"
              px="8"
              direction="column"
              onSubmit={handleSubmit(handleSendRequest)}
            >
              {architect && (
                <Box mb="8">
                  <Text fontSize="18">
                    Para o arquiteto: {architect.userById.name}
                  </Text>
                </Box>
              )}

              <Input
                type="text"
                label="Título"
                placeholder="Título do projeto"
                error={errors.title as FieldError}
                {...register('title')}
              />

              <FormControl>
                <FormLabel htmlFor="description">Descrição</FormLabel>
                <Textarea
                  id="description"
                  placeholder="Conte um pouco sobre o projeto"
                  size="lg"
                  {...register('description')}
                />
              </FormControl>

              <Flex justify="center">
                <Button
                  type="submit"
                  mt="6"
                  colorScheme="blue"
                  isLoading={isSubmitting}
                  leftIcon={<Icon as={RiSendPlaneFill} />}
                >
                  Enviar
                </Button>
              </Flex>
            </Stack>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

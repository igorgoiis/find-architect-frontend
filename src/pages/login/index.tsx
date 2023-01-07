import { Button, Center, Flex, Link, Stack } from '@chakra-ui/react';
import Head from 'next/head';
import { Input } from '../../components/Form/Input';
import { useForm } from 'react-hook-form';
import { FieldError, SubmitHandler } from 'react-hook-form/dist/types';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
  password: yup
    .string()
    .required('Senha é obrigatória')
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .max(20, 'A senha deve ter no máximo 20 caracteres'),
});

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema),
  });

  const handleSingIn: SubmitHandler<SignInFormData> = (data) => {
    console.log({ data });
  };

  return (
    <>
      <Head>
        <title>Login | Find Architect</title>
      </Head>
      <Flex w="100vw" h="100vh" align="center" justify="center">
        <Flex
          as="form"
          width="100%"
          maxWidth={360}
          bg="gray.700"
          p={8}
          borderRadius={8}
          flexDir="column"
          onSubmit={handleSubmit(handleSingIn)}
        >
          <Stack spacing={4}>
            <Input
              type="email"
              label="E-mail"
              error={errors.email as FieldError}
              {...register('email')}
            />
            <Input
              type="password"
              label="Senha"
              error={errors.password as FieldError}
              {...register('password')}
            />

            <Button
              type="submit"
              mt="6"
              colorScheme="blue"
              isLoading={isSubmitting}
            >
              Entrar
            </Button>
          </Stack>
          <Center mt={8}>
            <Link fontSize="lg">Cadastre-se</Link>
          </Center>
        </Flex>
      </Flex>
    </>
  );
}

export default Login;

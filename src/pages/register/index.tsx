import {
  Alert,
  AlertIcon,
  Button,
  Center,
  Collapse,
  Flex,
  FormLabel,
  Link,
  Radio,
  RadioGroup,
  Stack,
  useToast,
  ToastId,
  FormControl,
  Textarea,
} from '@chakra-ui/react';
import Head from 'next/head';
import { Input } from '../../components/Form/Input';
import { Controller, useForm } from 'react-hook-form';
import { FieldError, SubmitHandler } from 'react-hook-form/dist/types';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../../hooks/useAuth';
import React, { useState } from 'react';
import { Gender } from '../../shared/models/enums/gender.enum';
import { Role } from '../../shared/models/enums/roles.enum';
import { maskPhone } from '../../utils/masks';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import { ptBR } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';

type RegisterFormData = {
  email: string;
  name: string;
  bio: string;
  phone: string;
  gender: Gender;
  birdDate: Date;
  role: Role;
  password: string;
  confirm_password: string;
};

const registerFormSchema = yup.object().shape({
  email: yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
  name: yup.string().required('Nome é obrigatório'),
  bio: yup.string().required('Sobre é obrigatório.'),
  phone: yup.string().required('Telefone é obrigatório'),
  birdDate: yup.date().required('Data de nascimento é obrigatória'),
  password: yup
    .string()
    .required('Senha é obrigatória')
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .max(20, 'A senha deve ter no máximo 20 caracteres'),
  confirm_password: yup
    .string()
    .required('Confirmaçao de senha é obrigatória')
    .oneOf([yup.ref('password'), null], 'As senhas devem ser iguais'),
});

registerLocale('pt-BR', ptBR);
setDefaultLocale('pt-BR');

function Register() {
  const { register: singUp } = useAuth();
  const toast = useToast();
  const toastIdRef = React.useRef<ToastId>();

  const [alertErrorIsOpen, setAlertErrorIsOpen] = useState(false);
  const [alertErrorMessage, setAlertErrorMessage] = useState('');

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerFormSchema),
  });

  const handleRegister: SubmitHandler<RegisterFormData> = (value, e) => {
    e?.preventDefault();
    const { email, name, bio, phone, gender, role, birdDate, password } = value;

    singUp(
      { email, name, bio, phone, gender, role, birdDate, password },
      () => {
        setAlertErrorIsOpen(false);
        toastIdRef.current = toast({
          title: 'Sua conta foi criada.',
          description: 'Você será redirecionado para pagina de login.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      },
      (err) => {
        if (err.message === 'This email already exists.') {
          setAlertErrorMessage('Esse e-mail já existe no nosso sistema.');
        } else {
          setAlertErrorMessage(
            'Erro ao tentar criar o usuário, por favor tente novamente mais tarde.',
          );
        }
        setAlertErrorIsOpen(true);
      },
    );
  };

  return (
    <>
      <Head>
        <title>Cadastre-se | Find Architect</title>
      </Head>
      <Flex w="100vw" h="100%" minH="100vh" align="center" justify="center">
        <Flex
          as="form"
          width="100%"
          maxWidth={500}
          bg="gray.700"
          p={8}
          m={5}
          borderRadius={8}
          flexDir="column"
          onSubmit={handleSubmit(handleRegister)}
        >
          <Collapse in={alertErrorIsOpen} animateOpacity>
            <Alert status="error" variant="left-accent" mb={6}>
              <AlertIcon />
              {alertErrorMessage}
            </Alert>
          </Collapse>
          <Stack spacing={4}>
            <Input
              type="email"
              label="E-mail"
              error={errors.email as FieldError}
              placeholder="Seu e-mail"
              {...register('email')}
            />
            <Input
              type="text"
              label="Nome"
              error={errors.name as FieldError}
              placeholder="Seu nome"
              {...register('name')}
            />

            <FormControl>
              <FormLabel htmlFor="bio">Sobre</FormLabel>
              <Textarea
                id="bio"
                placeholder="Fale um pouco sobre você"
                size="lg"
                {...register('bio')}
              />
            </FormControl>

            <Controller
              control={control}
              name="phone"
              render={({ field: { name, value, onChange } }) => (
                <Input
                  name={name}
                  value={value ? maskPhone(value) : ''}
                  onChange={onChange}
                  type="text"
                  label="Telefone"
                  error={errors.phone as FieldError}
                  placeholder="(XX) 9XXXX-XXXX"
                />
              )}
            />
            <Controller
              control={control}
              name="birdDate"
              render={({ field: { name, onChange, value } }) => (
                <>
                  <FormLabel htmlFor={name} id={name}>
                    Data de nascimento
                  </FormLabel>
                  <DatePicker
                    id={name}
                    selected={value}
                    onChange={(date) => onChange(date)}
                    dateFormat="dd/MM/yyyy"
                    maxDate={new Date()}
                    showYearDropdown
                    yearDropdownItemNumber={80}
                    scrollableYearDropdown
                    placeholderText="__/__/____"
                    customInput={
                      <Input
                        id={name}
                        name={name}
                        type="text"
                        error={errors.birdDate as FieldError}
                      />
                    }
                  />
                </>
              )}
            />
            <Input
              type="password"
              label="Senha"
              error={errors.password as FieldError}
              placeholder="Seu senha"
              {...register('password')}
            />
            <Input
              type="password"
              label="Confirme a senha"
              error={errors.confirm_password as FieldError}
              {...register('confirm_password')}
              placeholder="Confirme a senha"
            />
            <Controller
              control={control}
              name="gender"
              render={({ field: { name, onChange, value } }) => (
                <>
                  <FormLabel htmlFor={name} id={name}>
                    Gênero
                  </FormLabel>
                  <RadioGroup name={name} onChange={onChange} value={value}>
                    <Stack direction="row">
                      <Radio value={Gender.M}>Masculino</Radio>
                      <Radio value={Gender.F}>Feminino</Radio>
                    </Stack>
                  </RadioGroup>
                </>
              )}
            />
            <Controller
              control={control}
              name="role"
              render={({ field: { name, onChange, value } }) => (
                <>
                  <FormLabel htmlFor={name} id={name}>
                    Tipo de usuário
                  </FormLabel>
                  <RadioGroup name={name} onChange={onChange} value={value}>
                    <Stack direction="row">
                      <Radio value={Role.Architect}>Arquiteto</Radio>
                      <Radio value={Role.Client}>Cliente</Radio>
                    </Stack>
                  </RadioGroup>
                </>
              )}
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
            <Link href="/login" fontSize="md">
              Já tem conta? <strong>Entre</strong>
            </Link>
          </Center>
        </Flex>
      </Flex>
    </>
  );
}

export default Register;

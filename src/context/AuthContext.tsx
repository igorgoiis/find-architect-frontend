import { useRouter } from 'next/router';
import { createContext, ReactNode, useEffect, useState } from 'react';
import {
  useCreateUserMutation,
  useGetUserByIdQuery,
  useLoginMutation,
} from '../graphql/generated/graphql';
import { IUser } from '../shared/models/user.model';
import {
  AuthValuesType,
  ErrCallbackType,
  LoginParams,
  RegisterParams,
  SuccessCallbackType,
} from './types';

type Props = {
  children: ReactNode;
};

const defaultProvider: AuthValuesType = {
  user: null,
  setUser: () => null,
  loading: true,
  setLoading: () => Boolean,
  isInitialized: false,
  setIsInitialized: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
};

const AuthContext = createContext(defaultProvider);

function AuthProvider({ children }: Props) {
  // ** States
  const [user, setUser] = useState<IUser | null>(defaultProvider.user);
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);
  const [isInitialized, setIsInitialized] = useState<boolean>(
    defaultProvider.isInitialized,
  );

  // ** Hooks
  const router = useRouter();
  const [login] = useLoginMutation({
    onCompleted({ login }) {
      localStorage.setItem('@user:token', login.token);
      localStorage.setItem('@user:id', login.user.id);
    },
  });
  const { refetch } = useGetUserByIdQuery({
    variables: { id: '' },
    refetchWritePolicy: 'overwrite',
  });
  const [createUser] = useCreateUserMutation();

  useEffect(() => {
    console.log({ user, isInitialized });
    if (user && !isInitialized) {
      setIsInitialized(true);
      console.log('redirecionou');
      router.replace('/');
    }
  }, [user, isInitialized, router]);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('@user:token');
      const id = localStorage.getItem('@user:id');
      try {
        if (token && id) {
          const newUser = await refetch({ id });
          setUser(newUser.data.userById);
        } else {
          setUser(null);
          localStorage.removeItem('@user:token');
          localStorage.removeItem('@user:id');
          console.log('redirecionou no else');
          router.replace('/');
        }
      } catch (error) {
        setUser(null);
        localStorage.removeItem('@user:token');
        localStorage.removeItem('@user:id');
        console.log('redirecionou no outro else');
        router.replace('/');
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log({ user });
  }, [user]);

  const handleLogin = async (
    params: LoginParams,
    successCallback?: SuccessCallbackType,
    errorCallback?: ErrCallbackType,
  ) => {
    try {
      const { data } = await login({
        variables: {
          data: params,
        },
      });
      const newUser = { ...data?.login.user };
      setUser({
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        gender: newUser.gender,
        role: newUser.role,
        phone: newUser.phone,
        birdDate: newUser.birdDate,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      });
      if (successCallback) successCallback(true);
    } catch (e: any) {
      if (errorCallback) errorCallback({ message: e.message });
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsInitialized(false);
    window.localStorage.removeItem('@user:token');
    router.push('/login');
  };

  const handleRegister = async (
    params: RegisterParams,
    successCallback?: SuccessCallbackType,
    errorCallback?: ErrCallbackType,
  ) => {
    try {
      await createUser({
        variables: { data: params },
      });
      if (successCallback) successCallback(true);
    } catch (error: any) {
      if (errorCallback) errorCallback(error);
    }
  };

  const values = {
    user,
    setUser,
    loading,
    setLoading,
    isInitialized,
    setIsInitialized,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };

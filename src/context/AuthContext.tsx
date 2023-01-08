import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { createContext, ReactNode, useState } from 'react';
import { useLoginMutation, User } from '../graphql/generated/graphql';
import { Role } from '../shared/models/enums/roles.enum';
import { IUser } from '../shared/models/user.model';
import {
  AuthValuesType,
  ErrCallbackType,
  LoginParams,
  SuccessCallbackType,
} from './types';

type Props = {
  children: ReactNode;
};

const defaultProvider: AuthValuesType = {
  user: null,
  setUser: () => null,
  // loading: true,
  // setLoading: () => Boolean,
  // isInitialized: false,
  login: () => Promise.resolve(),
  // logout: () => Promise.resolve(),
  // setIsInitialized: () => Boolean,
  // register: () => Promise.resolve(),
};

const AuthContext = createContext(defaultProvider);

function AuthProvider({ children }: Props) {
  // ** States
  const [user, setUser] = useState<IUser | null>(defaultProvider.user);
  // const [loading, setLoading] = useState<boolean>(defaultProvider.loading);
  // const [isInitialized, setIsInitialized] = useState<boolean>(
  //   defaultProvider.isInitialized,
  // );

  // ** Hooks
  const router = useRouter();
  const [login] = useLoginMutation({
    onCompleted({ login }) {
      localStorage.setItem('@user:token', login.token);
    },
  });

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

  const values = {
    user,
    setUser,
    login: handleLogin,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };

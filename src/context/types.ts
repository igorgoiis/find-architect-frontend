import { IUser } from '../shared/models/user.model';

export type ErrCallbackType = (err: { [key: string]: string }) => void;

export type SuccessCallbackType = (success: boolean) => void;

export type LoginParams = {
  email: string;
  password: string;
};

export type RegisterParams = {
  username: string;
  cnpj: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type AuthValuesType = {
  // loading: boolean;
  // setLoading: (value: boolean) => void;
  // isInitialized: boolean;
  // setIsInitialized: (value: boolean) => void;
  user: IUser | null;
  // setUser: (value: IUser | null) => void;
  login: (
    params: LoginParams,
    successCallback?: SuccessCallbackType,
    errorCallback?: ErrCallbackType,
  ) => void;
  // logout: () => void;
  // register: (params: RegisterParams, errorCallback?: ErrCallbackType) => void;
};

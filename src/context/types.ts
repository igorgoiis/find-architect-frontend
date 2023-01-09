import { Gender } from '../shared/models/enums/gender.enum';
import { Role } from '../shared/models/enums/roles.enum';
import { IUser } from '../shared/models/user.model';

export type ErrCallbackType = (err: { [key: string]: string }) => void;

export type SuccessCallbackType = (success: boolean) => void;

export type LoginParams = {
  email: string;
  password: string;
};

export type RegisterParams = {
  email: string;
  name: string;
  bio: string;
  phone: string;
  gender: Gender;
  birdDate: Date;
  role: Role;
  password: string;
};

export type AuthValuesType = {
  loading: boolean;
  setLoading: (value: boolean) => void;
  isInitialized: boolean;
  setIsInitialized: (value: boolean) => void;
  user: IUser | null;
  setUser: (value: IUser | null) => void;
  login: (
    params: LoginParams,
    successCallback?: SuccessCallbackType,
    errorCallback?: ErrCallbackType,
  ) => void;
  logout: () => void;
  register: (
    params: RegisterParams,
    successCallback?: SuccessCallbackType,
    errorCallback?: ErrCallbackType,
  ) => void;
};

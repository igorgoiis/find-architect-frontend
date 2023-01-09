import { Gender } from './enums/gender.enum';
import { Role } from './enums/roles.enum';

export interface IUser {
  id?: string;
  email?: string;
  bio?: string;
  password?: string;
  name?: string;
  phone?: string;
  gender?: Gender;
  birdDate?: Date;
  role?: Role;
  createdAt?: Date;
  updatedAt?: Date;
}

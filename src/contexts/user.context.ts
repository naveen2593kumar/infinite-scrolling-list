import { createContext } from 'react';
import { IUser } from '../model/user.interface';

type ContextProps = {
  user: IUser,
  setUser: (user: IUser) => void,
};

export const UserContext = createContext<Partial<ContextProps>>({});

const UserProvider = UserContext.Provider;

export default UserProvider;
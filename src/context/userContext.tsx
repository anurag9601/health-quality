"use client";

import React, { Dispatch, ReactNode, SetStateAction } from "react";

export interface userDataType {
  id: number;
  email: string;
}

interface userContextDataType {
  user: userDataType | null;
  setUser: Dispatch<SetStateAction<userDataType | null>>;
}

export const UserContext = React.createContext<userContextDataType>({
  user: null,
  setUser: () => {},
});

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = React.useState<userDataType | null>(null);

  const values = {
    user,
    setUser,
  };
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export default UserProvider;

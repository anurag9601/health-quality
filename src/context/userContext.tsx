"use client";

import React, { Dispatch, ReactNode, SetStateAction } from "react";

export interface userDataType {
  id: number | null;
  email: string;
  continueWith: string;
}

interface userContextDataType {
  user: userDataType | null;
  setUser: Dispatch<SetStateAction<userDataType | null>>;
  userAllProduct: any;
  setUserAllProduct: Dispatch<SetStateAction<any>>;
  currentOpenProduct: any;
  setCurrentOpenProduct: Dispatch<SetStateAction<any>>;
}

export const UserContext = React.createContext<userContextDataType>({
  user: null,
  setUser: () => {},
  userAllProduct: [],
  setUserAllProduct: () => {},
  currentOpenProduct: null,
  setCurrentOpenProduct: () => {},
});

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = React.useState<userDataType | null>(null);

  const [userAllProduct, setUserAllProduct] = React.useState<any>([]);

  const [currentOpenProduct, setCurrentOpenProduct] = React.useState<any>(null);

  const values = {
    user,
    setUser,
    userAllProduct,
    setUserAllProduct,
    currentOpenProduct,
    setCurrentOpenProduct,
  };
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export default UserProvider;

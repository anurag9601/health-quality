"use client";
import React, { Dispatch, ReactNode, SetStateAction } from "react";

export interface userDataType {
  id: number | null;
  email: string;
  continueWith: string;
}

export interface ProductDetails {
  product_name?: string;
  expiry_date?: string;
  manufacture_date?: string;
}

export interface HealthAssessment {
  healthy: boolean;
  overall_health_assessment?: string;
}

export interface Ingredient {
  name: string;
  healthy: boolean;
  description: string;
  not_good_for?: string;
}

export interface UserProduct {
  _id: string;
  Product_Details: ProductDetails;
  Overall_Health_Assessment: HealthAssessment;
  Ingredients_Information: Ingredient[];
  productImgURL: string;
}

interface userContextDataType {
  user: userDataType | null;
  setUser: Dispatch<SetStateAction<userDataType | null>>;
  userAllProduct: UserProduct[] | [];
  setUserAllProduct: Dispatch<SetStateAction<UserProduct[]>>;
  currentOpenProduct: UserProduct | null;
  setCurrentOpenProduct: Dispatch<SetStateAction<UserProduct | null>>;
  notificationWindowOpen: boolean;
  setNotificationWindowOpen: Dispatch<SetStateAction<boolean>>;
}

export const UserContext = React.createContext<userContextDataType>({
  user: null,
  setUser: () => {},
  userAllProduct: [],
  setUserAllProduct: () => {},
  currentOpenProduct: null,
  setCurrentOpenProduct: () => {},
  notificationWindowOpen: false,
  setNotificationWindowOpen: () => {},
});

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = React.useState<userDataType | null>(null);

  const [userAllProduct, setUserAllProduct] = React.useState<
    UserProduct[] | []
  >([]);

  const [currentOpenProduct, setCurrentOpenProduct] =
    React.useState<UserProduct | null>(null);

  const [notificationWindowOpen, setNotificationWindowOpen] =
    React.useState<boolean>(false);

  const values = {
    user,
    setUser,
    userAllProduct,
    setUserAllProduct,
    currentOpenProduct,
    setCurrentOpenProduct,
    notificationWindowOpen,
    setNotificationWindowOpen
  };
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export default UserProvider;

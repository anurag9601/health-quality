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

export interface notificationsDataType {
  createdAt: string;
  notificationMessage: string;
  notificationType: string;
  updatedAt: string;
  _id: string;
  read: boolean;
}

export interface expiryAlertProductsDataType {
  _id: string;
  userEmail: String;
  productName: String;
  expiryDate: String;
  manufectureDate: String;
}

interface userContextDataType {
  user: userDataType | null;
  setUser: Dispatch<SetStateAction<userDataType | null>>;
  userAllProduct: UserProduct[] | null;
  setUserAllProduct: Dispatch<SetStateAction<UserProduct[]>>;
  currentOpenProduct: UserProduct | null;
  setCurrentOpenProduct: Dispatch<SetStateAction<UserProduct | null>>;
  notificationWindowOpen: boolean;
  setNotificationWindowOpen: Dispatch<SetStateAction<boolean>>;
  notifications: notificationsDataType[] | null;
  setNotifications: Dispatch<SetStateAction<[] | notificationsDataType[]>>;
  unReadNotifications: notificationsDataType[] | [];
  setUnReadNotifications: Dispatch<
    SetStateAction<[] | notificationsDataType[]>
  >;
  expiryAlertProducts: expiryAlertProductsDataType[] | null;
  setExpiryAlertProducts: Dispatch<
    SetStateAction<expiryAlertProductsDataType[] | []>
  >;
}

export const UserContext = React.createContext<userContextDataType>({
  user: null,
  setUser: () => {},
  userAllProduct: null,
  setUserAllProduct: () => {},
  currentOpenProduct: null,
  setCurrentOpenProduct: () => {},
  notificationWindowOpen: false,
  setNotificationWindowOpen: () => {},
  notifications: null,
  setNotifications: () => {},
  unReadNotifications: [],
  setUnReadNotifications: () => {},
  expiryAlertProducts: null,
  setExpiryAlertProducts: () => {},
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

  const [notifications, setNotifications] = React.useState<
    notificationsDataType[] | []
  >([]);

  const [unReadNotifications, setUnReadNotifications] = React.useState<
    notificationsDataType[] | []
  >([]);

  const [expiryAlertProducts, setExpiryAlertProducts] = React.useState<
    expiryAlertProductsDataType[] | []
  >([]);

  const values = {
    user,
    setUser,
    userAllProduct,
    setUserAllProduct,
    currentOpenProduct,
    setCurrentOpenProduct,
    notificationWindowOpen,
    setNotificationWindowOpen,
    notifications,
    setNotifications,
    unReadNotifications,
    setUnReadNotifications,
    expiryAlertProducts,
    setExpiryAlertProducts,
  };
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export default UserProvider;

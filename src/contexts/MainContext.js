'use client';
import React, { useEffect, useReducer } from 'react';
import { createContext, useContext } from 'react';
import MainReducer from '@/reducers/MainReducer';
import {
  ADD_USER,
  DETECT_FILTER,
  DETECT_NAVBAR,
  REMOVE_USER,
  ADD_PRODUCT,
  CALCULATE_TOTALS,
  REMOVE_PRODUCT,
  UPDATE_CARD,
  CHANGE_SHPPING_DETAIL,
  CLEAR_SHPPING_DETAIL,
  HANDLE_CHANGE_SHIPPING,
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  COUNT_CART_TOTALS,
  UPDATE_CART,
} from '@/actions/actions';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import customFetch, { checkForUnauthorizedResponse } from '@/util/axios';
const MainContext = createContext();
const intialState = {
  navbar: false,
  filter: false,
  user: {},
  shippingDetails: {
    address: '',
    country: '',
  },
  isEditing: false,
  cart: [],
  total_items: 0,
  total_amount: 0,
};
export default function MainProvider({ children }) {
  const [state, dispatch] = useReducer(MainReducer, intialState);
  const token = Cookies.get('calidoUser');

  // Navbar filter Operation
  const detectNavbar = (val) => {
    dispatch({ type: DETECT_NAVBAR, payload: val });
  };
  const detectFilter = (val) => {
    dispatch({ type: DETECT_FILTER, payload: val });
  };
  const handleChangeShipping = (data) => {
    dispatch({ type: HANDLE_CHANGE_SHIPPING, payload: data });
  };
  // User Operation
  const AddUser = (user) => {
    dispatch({ type: ADD_USER, payload: user });
  };
  const removeUser = () => {
    Cookies.remove('calidoUser');
    dispatch({ type: REMOVE_USER });
  };
  // Get cart
  const getCart = async () => {
    if (!token) {
      return;
    }
    try {
      const res = await customFetch('/cart');
      const tempData = res?.data?.cart.map((item) => {
        return {
          ...item,
          name_en: item?.Product?.name_en,
          price: item?.Product?.price,
        };
      });
      dispatch({ type: UPDATE_CART, payload: tempData });
    } catch (error) {
      checkForUnauthorizedResponse(error, removeUser);
    }
  };
  const UpdateUserContext = async () => {
    if (!token) {
      return;
    }
    try {
      const response = await customFetch('/users/me');
      const newData = {
        ...response?.data?.user,
        phoneNumber: response?.data?.phoneNumber[0],
      };
      AddUser(newData);
    } catch (error) {
      checkForUnauthorizedResponse(error, removeUser);
    }
  };
  // Shipping Operation
  const editShippingDetails = (shippingdetail) => {
    dispatch({ type: CHANGE_SHPPING_DETAIL, payload: shippingdetail });
  };
  // Clear Shipping Operation
  const clearShippingDetails = () => {
    dispatch({ type: CLEAR_SHPPING_DETAIL });
  };

  // Products Operation
  const addToCart = (id, amount, product) => {
    dispatch({ type: ADD_TO_CART, payload: { id, amount, product } });
  };
  const updateCart = (id, value) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } });
  };
  const removeFromCart = (id) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id });
  };

  useEffect(() => {
    if (token) {
      UpdateUserContext();
      getCart();
    }
  }, [token]);
  useEffect(() => {
    dispatch({ type: COUNT_CART_TOTALS });
  }, [state.cart]);

  return (
    <MainContext.Provider
      value={{
        ...state,
        detectNavbar,
        AddUser,
        removeUser,
        detectFilter,
        editShippingDetails,
        clearShippingDetails,
        handleChangeShipping,
        addToCart,
        updateCart,
        removeFromCart,
        getCart,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
export const useMainContext = () => {
  return useContext(MainContext);
};

'use client';

import { useMainContext } from '@/contexts/MainContext';
import customFetch, { checkForUnauthorizedResponse } from '@/util/axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

export default function AddToCartProductComponent({ product }) {
  const { getCart, cart } = useMainContext();
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const addToCart = async (productid, quantity, stock) => {
    setLoadingUpdate(true);

    let tempAmount = quantity;
    if (tempAmount > stock) {
      toast.success('this package will arrive after 2 months');
    } else if (tempAmount < 1) {
      tempAmount = 1;
    }

    const findProduct = cart.find((prod) => prod?.Product.id === productid);
    if (findProduct) {
      toast.error('alread in cart');
    } else {
      try {
        await customFetch.post('/cart', {
          product: productid,
          quantity: tempAmount,
        });
        getCart();
        toast.success('added successfully...');
        setLoadingUpdate(false);
      } catch (error) {
        checkForUnauthorizedResponse(error, removeUser);
        setLoadingUpdate(false);
      }
    }
  };

  return (
    <button
      className={` btn-primary mx-2 mb-5`}
      onClick={() => addToCart(product?.id, 1, product?.stock)}
      disabled={loadingUpdate}
    >
      {/* {found ? 'view cart' : ' Add to cart'} */}
      Add To Cart
    </button>
  );
}

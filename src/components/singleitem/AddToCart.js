'use client';
import React, { useState } from 'react';
import InputCounter from './InputCounter';
import { useMainContext } from '@/contexts/MainContext';
import { toast } from 'react-toastify';
import customFetch, { checkForUnauthorizedResponse } from '@/util/axios';

export default function AddToCart({ product }) {
  const [amount, setAmount] = useState(1);
  const { removeUser, cart, getCart } = useMainContext();
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const increase = () => {
    setAmount((oldAmount) => {
      let tempAmount = oldAmount + 1;
      if (tempAmount > product?.stock) {
        toast.success('it will arrive after 2 months');
      }
      return tempAmount;
    });
  };
  const decrease = () => {
    setAmount((oldAmount) => {
      let tempAmount = oldAmount - 1;
      if (tempAmount < 1) {
        tempAmount = 1;
      }
      return tempAmount;
    });
  };
  const updateCart = async (productid, quantity, stock) => {
    setLoadingUpdate(true);

    let tempAmount = quantity;
    if (tempAmount > stock) {
      toast.success('this package will arrive after 2 months');
    } else if (tempAmount < 1) {
      tempAmount = 1;
    }

    const findProduct = cart.find((prod) => prod?.Product.id === productid);
    if (findProduct) {
      try {
        const response = await customFetch.put(`/cart/${findProduct.id}`, {
          quantity: tempAmount,
        });
        toast.success('added successfully...');

        getCart();
        setLoadingUpdate(false);
      } catch (error) {
        checkForUnauthorizedResponse(error, removeUser);
        setLoadingUpdate(false);
      }
    } else {
      try {
        await customFetch.post('/cart', {
          product: productid,
          quantity: tempAmount,
        });
        getCart();
        toast.success('added successfully...');
      } catch (error) {
        checkForUnauthorizedResponse(error, removeUser);
      }
    }
  };
  return (
    <>
      {Number(product?.stock) > 0 ? (
        <div className='flex  flex-wrap gap-2 border-t-2 border-b-2 border-gray-200  py-5 sm:py-10'>
          <InputCounter
            amount={amount}
            increase={increase}
            decrease={decrease}
          />
          <button
            className='btn-primary flex-1 whitespace-nowrap'
            onClick={() => updateCart(product?.id, amount, product?.stock)}
            disabled={loadingUpdate}
          >
            Add To Cart
          </button>
        </div>
      ) : (
        <h1 className='text-xl sm:text-2xl'>Out Of product stock</h1>
      )}
    </>
  );
}

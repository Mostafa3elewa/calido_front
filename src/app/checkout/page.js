'use client';
import { useMainContext } from '@/contexts/MainContext';
import customFetch, { checkForUnauthorizedResponse } from '@/util/axios';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

export default function Checkout() {
  const { removeUser } = useMainContext();
  const { data } = useQuery({
    queryKey: ['shippingMethods'],
    queryFn: async () => {
      const data = await customFetch('/shippingmethods/order');
      console.log(data);
      return data;
    },
    onError: (error) => {
      checkForUnauthorizedResponse(error, removeUser);
    },
  });

  return <div>page</div>;
}

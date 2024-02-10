'use client';
import { useMainContext } from '@/contexts/MainContext';
import Link from 'next/link';
import React, { useState } from 'react';

export default function InfoAboutOrders({ data }) {
  const { total_items, total_amount } = useMainContext();
  const [selectedOption, setSelectedOption] = useState(
    data?.outStockMethods[0].id
  );

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  console.log(data);
  return (
    <section className='p-4 sm:p-6 border-2 border-gray-200'>
      <h5 className='text-base sm:text-lg font-bold'>Cart totals</h5>
      <div className='flex justify-between flex-wrap gap-3 pb-4 border-b-2 border-gray-200 border-dotted  my-4'>
        <span className='text-base sm:text-lg text-secondary font-semibold'>
          total items
        </span>
        <span className='text-base sm:text-lg text-secondary font-semibold'>
          {total_items}
        </span>
      </div>
      <div className='flex justify-between flex-wrap gap-3 my-4'>
        <span className='text-base sm:text-lg text-secondary font-semibold'>
          Total Amount
        </span>
        <span className='text-base sm:text-lg text-secondary font-semibold'>
          {total_amount.toFixed(2)} Egp
        </span>
      </div>
      <div className='flex items-center gap-2 mb-3'>
        <span className='text-base sm:text-lg text-secondary font-semibold'>
          products in stock
        </span>
        <div className='flex items-center mb-2'>
          <input
            type='radio'
            id={data?.inStockMethods[0].id}
            name='inStock'
            value={data?.inStockMethods[0].id}
            checked='true'
            className='mr-2'
          />
          <label
            htmlFor={data?.inStockMethods[0].id}
            className='cursor-pointer'
          >
            duration: {data?.inStockMethods[0].duration} fees:
            {data?.inStockMethods[0].fees}
            <span className='mx-1'> by {data?.inStockMethods[0].method}</span>
          </label>
        </div>
      </div>
      <div className='flex items-center gap-2 mb-3'>
        <span className='text-base sm:text-lg text-secondary font-semibold'>
          products out of stock
        </span>
        <div className='flex flex-col'>
          <div className='flex items-center mb-2'>
            <input
              type='radio'
              id={data?.outStockMethods[0].id}
              name='outStock'
              value={data?.outStockMethods[0].id}
              checked={selectedOption == data?.outStockMethods[0].id}
              className='mr-2'
              onChange={handleOptionChange}
            />
            <label
              htmlFor={data?.outStockMethods[0].id}
              className='cursor-pointer'
            >
              duration: {data?.outStockMethods[0].duration} fees:
              {data?.outStockMethods[0].fees}
              <span className='mx-1'>
                {' '}
                by {data?.outStockMethods[0].method}
              </span>
            </label>
          </div>
          <div className='flex items-center mb-2'>
            <input
              type='radio'
              id={data?.outStockMethods[1].id}
              name='outStock'
              value={data?.outStockMethods[1].id}
              checked={selectedOption == data?.outStockMethods[1].id}
              className='mr-2'
              onChange={handleOptionChange}
            />
            <label
              htmlFor={data?.outStockMethods[1].id}
              className='cursor-pointer'
            >
              duration: {data?.outStockMethods[1].duration} fees:
              {data?.outStockMethods[1].fees}
              <span className='mx-1'>
                {' '}
                by {data?.outStockMethods[1].method}
              </span>
            </label>
          </div>
        </div>
      </div>
      <Link className='btn-primary w-full mt-4 sm:mt-6' href='checkout'>
        proceed to checkout
      </Link>
    </section>
  );
}

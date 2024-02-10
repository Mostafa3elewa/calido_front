'use client';
import React, { useState } from 'react';

export default function InputCounter({ amount, increase, decrease }) {
  return (
    <div className='flex items-center gap-4'>
      <button
        className=' text-gray-700 rounded-sm flex justify-center items-center w-5 hover:bg-primary smooth text-lg'
        onClick={decrease}
      >
        -
      </button>
      {/* <input
        type='number'
        value={amount}
        className='text-center border-gray-500 border rounded-md  w-[80px] md:w-[120px] py-2 md:py-4 '
        // onChange={(e) => setCount(parseInt(e.target.value))}
      /> */}
      <span className='text-center text-xl '>{amount}</span>
      <button
        className='  text-gray-700 rounded-sm flex justify-center items-center w-5 hover:bg-primary smooth text-lg'
        onClick={increase}
      >
        +
      </button>
    </div>
  );
}

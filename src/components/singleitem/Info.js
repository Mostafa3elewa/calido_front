import React from 'react';
import InputCounter from './InputCounter';
import AddToCart from './AddToCart';

export default function Info({ product }) {
  return (
    <div className='flex flex-col gap-y-6'>
      <h2 className='head text-start'>{product?.name_en}</h2>
      <div className='flex gap-2'>
        {Number(product?.sale) ? (
          <>
            <span className='text-lg text-secondary font-bold'>
              {product?.newPrice?.toFixed(2)}Egp
            </span>
            <span className='text-lg text-gray-400 line-through'>
              {product?.price?.toFixed(2)}Egp
            </span>
          </>
        ) : (
          <span className='text-lg text-secondary font-bold'>
            {product?.price?.toFixed(2)}Egp
          </span>
        )}
      </div>
      <p className='paragraph text-start'>{product?.description}</p>
      <AddToCart product={product} />
      <div className='flex gap-2'>
        <span className='fw-bold'>Category:</span>
        <span className='text-secondary'> Casual</span>
      </div>
    </div>
  );
}

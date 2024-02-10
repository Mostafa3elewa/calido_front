'use client';
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
export const StarRating = ({ rate, setRate }) => {
  const [hover, setHover] = useState(null);
  return (
    <div className='flex rating-star'>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i}>
            <input
              type='radio'
              name='rating'
              className='star-rating-radio d-none'
              value={ratingValue}
              onClick={() => setRate(ratingValue)}
              onMouseOver={() => setHover(() => ratingValue)}
              onMouseOut={() => setHover(null)}
            />
            <FaStar
              className={`text-xl star cursor-pointer ${
                ratingValue <= (hover || rate)
                  ? 'text-[#FDC001]'
                  : 'text-[#e4e5e9]'
              }`}
              onMouseOver={() => setHover(() => ratingValue)}
              onMouseOut={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

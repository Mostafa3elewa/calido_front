'use client';
import React, { useState } from 'react';
import { StarRating } from '@/components/shared-component/StarRating';
import Cookies from 'js-cookie';
import customFetch, { checkForUnauthorizedResponse } from '@/util/axios';
import { toast } from 'react-toastify';
import { useMainContext } from '@/contexts/MainContext';

export default function ReviewForm({ product }) {
  const token = Cookies.get('calidoUser');
  const { removeUser } = useMainContext();
  const [comment, setComment] = useState('');
  const [rate, setRate] = useState(0);
  const [loading, setLoading] = useState(false);

  if (!token) {
    return (
      <h2 className='text-base lg:text-lg font-semibold text-center'>
        Yo have To sign in to add review
      </h2>
    );
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rate || !comment) {
      toast.error('Please Fill Out All Fields');
      return;
    }
    try {
      setLoading(true);
      const response = await customFetch.post('/reviews', {
        ProductId: product?.id,
        rate,
        comment,
      });
      console.log(response);
      setComment('');
      setRate(0);
      toast.success('Your Review Added Successfully');
    } catch (error) {
      checkForUnauthorizedResponse(error, removeUser);
    } finally {
      setLoading(false);
    }
    return;
  };
  return (
    <div>
      <h2 className='text-base sm:text-xl font-semibold leading-7 sm:leading-9	'>
        {product?.name_en}
      </h2>
      <form
        className='flex flex-col gap-2 mt-3 sm:mt-5'
        onSubmit={handleSubmit}
      >
        <div className='flex items-center flex-wrap gap-2'>
          <span className=' text-secondary'>
            Your Rating <span className='text-red-600 '>*</span>
          </span>
          <StarRating setRate={setRate} rate={rate} />
        </div>
        <div className='mt-3 sm:mt-5 relative'>
          <textarea
            className='form-textarea w-full  border-2 py-3 px-2 border-gray-300 focus:border-yellow-400 h-40 outline-none'
            name='ratecomment'
            placeholder='Your review'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
        <button className=' btn-primary mt-5' type='submit'>
          {loading ? 'loading' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

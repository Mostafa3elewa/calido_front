'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import { BaseUrl } from '@/util/constants';
import axios from 'axios';
import customFetch, {
  checkForUnauthorizedResponse,
  customFetchNoUser,
} from '@/util/axios';
import { toast } from 'react-toastify';
import Loading from '../shared-component/Loading';
import { useMainContext } from '@/contexts/MainContext';
// async function getReviews(productid) {
//   const res = await fetch(`${BaseUrl}/reviews?ProductId=${productid}`);

//   if (!res.ok) {
//     toast.error('something wrong happen');
//   }

//   return res.json();
// }
export default function AllReviews({ productid }) {
  const { removeUser } = useMainContext();
  const getReviews = async () => {
    setLoading(true);
    try {
      const response = await customFetchNoUser(
        `/reviews?ProductId=${productid}`
      );
      console.log(response);
      setReviews(response?.data?.results?.rows);
    } catch (error) {
      checkForUnauthorizedResponse(error, removeUser);
    } finally {
      setLoading(false);
    }
  };
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getReviews();
  }, [productid]);
  if (loading) {
    return <Loading />;
  }
  if (reviews.length === 0) {
    return (
      <div>
        <h2 className='text-lg font-bold mb-3 sm:mb-5'>Reviews</h2>
        <span className='text-secondary '>There are no Reviews yet</span>
      </div>
    );
  }
  return (
    <div className=''>
      <h2 className='text-base sm:text-xl font-semibold border-b-2 border-gray-200 pb-3 sm:pb-5 '>
        All Reviews
      </h2>
      <div className='flex flex-col gap-y-4 sm:gap-y-8 mt-3 sm:mt-8'>
        {/* <div className='text-white flex justify-center '>
          <img src='/spinner.svg' alt='loading...' className='h-96' />
        </div> */}
        {reviews.map((review) => {
          console.log(review);
          const ratesColored = Array.from(
            { length: review?.rate },
            (_, index) => {
              return index + 1;
            }
          );
          const ratesUnColored = Array.from(
            { length: 5 - Number(review?.rate) },
            (_, index) => {
              return index + 1;
            }
          );
          return (
            <div key={review.id}>
              <div className='flex items-start gap-3'>
                <Image
                  src='/image-1.png'
                  width='100'
                  height='100'
                  className='rounded-full w-[50px] h-[50px] object-cover'
                  alt='review'
                />
                <div className='flex flex-col gap-y-3 sm:gap-y-5 w-full'>
                  <div className='flex justify-between items-center flex-wrap'>
                    <h1 className='text-sm sm:text-lg font-semibold'>
                      {review?.User?.firstName}
                      <span className='text-base text-secondary'>
                        / {review?.createdAt.split(' ')[0]}
                      </span>
                    </h1>
                    <div className='flex gap-2 whitespace-nowrap'>
                      {ratesColored.map((rate, index) => {
                        return <FaStar className='text-primary' key={index} />;
                      })}
                      {ratesUnColored.map((rate, index) => {
                        return (
                          <FaStar className='text-[#e4e5e9]' key={index} />
                        );
                      })}
                    </div>
                  </div>
                  <p className='paragraph'>{review?.comment}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* if product doesn't have reviews */}
      {/* <h2 className='text-lg font-bold mb-3 sm:mb-5'>Reviews</h2>
      <span className='text-secondary '>There are no Reviews yet</span> */}
    </div>
  );
}

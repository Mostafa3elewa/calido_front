'use client';
import { useMainContext } from '@/contexts/MainContext';
import customFetch, { checkForUnauthorizedResponse } from '@/util/axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const tokenFromSearch = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { removeUser } = useMainContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password) {
      toast.error('Please Fill Out All Fields');
      return;
    }
    try {
      setLoading(true);
      const response = await customFetch.post(
        '/auth/resetpassword',
        { password },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokenFromSearch}`,
          },
        }
      );

      toast.success('Your Password Changed Successfully');
      router.push('/signin');
    } catch (error) {
      checkForUnauthorizedResponse(error, removeUser);

      router.push('/forgetpass');
    } finally {
      setLoading(false);
    }
    return;
  };
  ``;
  return (
    <div className='flex  flex-1 flex-col justify-center px-3 py-12 lg:px-8'>
      <div className='container'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='mt-10 text-center text-base sm:text-2xl font-bold leading-5 sm:leading-9 tracking-tight text-gray-900'>
            Reset Password
          </h2>
        </div>

        <div className='mt-5 sm:mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form className='space-y-6' onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Enter Your New Password
              </label>
              <div className='mt-2'>
                <input
                  id='password'
                  type='password'
                  value={password}
                  autoComplete='email'
                  onChange={(e) => setPassword(e.target.value)}
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 px-2'
                />
              </div>
            </div>
            <div>
              <button type='submit' className='btn-primary w-full '>
                {loading ? (
                  <span>loading...</span>
                ) : (
                  <span> Reset Password</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

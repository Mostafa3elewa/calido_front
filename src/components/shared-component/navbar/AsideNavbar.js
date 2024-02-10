'use client';
import { useMainContext } from '@/contexts/MainContext';
import { navLiks } from '@/util/constants';
import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { MdKeyboardArrowDown } from 'react-icons/md';
import NavLink from './NavLink';
import Link from 'next/link';
export default function AsideNavbar() {
  const { navbar, detectNavbar } = useMainContext();

  return (
    <>
      <aside
        className={`fixed ${
          navbar && 'visiblenav'
        } h-[100%] bg-black/80 top-0  w-[70%]  z-10 asidenav`}
      >
        <div className='flex justify-end'>
          <AiOutlineClose
            className='text-2xl  cursor-pointer text-white m-3 hover:text-primary'
            onClick={() => detectNavbar(false)}
          />
        </div>
        <ul className='flex flex-col items-start gap-y-5 px-3 text-white'>
          {navLiks && navLiks.map((nav) => <NavLink {...nav} key={nav.id} />)}

         
        </ul>
      </aside>
    </>
  );
}

'use client';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation, EffectFade, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
export default function Slider() {
  return (
    <div>
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ type: 'progressbar' }}
        effect='fade'
        modules={[Navigation, EffectFade]}
        className='min-h-[80vh] select-none'
        speed={1000}
      >
        <SwiperSlide className='w-100 h-100 select-none'>
          <Image
            src='/image-030.jpg'
            className='w-100 h-100'
            width='1000'
            height='1000'
            alt='image'
          />

          {/* <div className='relative'></div>
          <p className='text-white bg-primary rounded-pill py-1 px-3 absolute top-0 name-ad'>
            light
          </p>
          <p className='text-white bg-primary rounded-pill py-1 px-3 absolute top-0 left-[50%] price-ad'>
            30 Egp
          </p> */}
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src='/image-059.jpg'
            alt=''
            className='w-100 h-100'
            width='1000'
            height='1000'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src='/image-114.jpg'
            alt=''
            className='w-100 h-100'
            width='1000'
            height='1000'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src='/image-059.jpg'
            alt=''
            className='w-100 h-100'
            width='1000'
            height='1000'
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

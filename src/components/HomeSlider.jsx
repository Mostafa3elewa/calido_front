'use client';
import React from 'react';
import { HiBuildingStorefront } from 'react-icons/hi2';
import { HiOutlineArrowTrendingUp } from 'react-icons/hi2';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';

const HomeSlider = () => {
  const data = [
    {
      img: '/image-059.jpg',
      id: 1,
      title: 'ahmed ashraf',
    },
    {
      img: '/image-114.jpg',
      id: 1,
      title: 'ahmed ashraf',
    },
    {
      img: '/image-070.jpg',
      id: 1,
      title: 'ahmed ashraf',
    },
    {
      img: '/image-030.jpg',
      id: 1,
      title: 'ahmed ashraf',
    },
    {
      img: '/image-059.jpg',
      id: 1,
      title: 'ahmed ashraf',
    },
    {
      img: '/image-114.jpg',
      id: 1,
      title: 'ahmed ashraf',
    },
    {
      img: '/image-070.jpg',
      id: 1,
      title: 'ahmed ashraf',
    },
    {
      img: '/image-030.jpg',
      id: 1,
      title: 'ahmed ashraf',
    },
  ];
  return (
    <div className=' container mx-5 mt-10 sm:mt-24'>
      <section className='text-neutral text-lg sm:text-2xl py-3 sm:py-5 mt-10 sm:mt-20'>
        <Swiper
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 15,
            },
          }}
          speed={3000}
          modules={[Autoplay]}
          className='mySwiper align-element'
        >
          {data?.map((slide, index) => (
            <SwiperSlide
              className='flex gap-3 items-center whitespace-nowrap w-full'
              key={slide.id}
            >
              <div
                className='bg-cover bg-no-repeat w-full h-96 relative group overflow-hidden rouned-lg'
                style={{
                  backgroundImage: `url(${slide.img})`,
                }}
              >
                <div className='group-hover:bg-black/50 overlay absolute bottom-0 w-full h-full left-0 transition-all duration-700'></div>
                <div className='absolute bottom-0 -left-[90%] group-hover:left-0 flex  transition-all   duration-700 cursor-pointer'>
           
                  <div className='px-4 flex flex-col items-start justify-center bg-white'>
                    <span className='text-xs text-base-content'>
                      {slide.title}
                    </span>
                    <span className='text-base font-bold text-black'>
                      {slide.title}
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default HomeSlider;

import React from 'react';

const WebsiteSection = () => {
  return (
    <div className='mt-8 sm:mt-24'>
      <div className='container'>
        <div className='flex flex-col lg:flex-row items-center lg:justify-between p-4 lg:p-8 gap-5 sm:gap-10  '>
          {/* First div - Info about the website */}
          <div className='lg:w-1/2 flex flex-col gap-5'>
            <h2 className='text-2xl font-bold '>Website Information</h2>
            <p className='text-gray-700'>
              Add your website information here. This could include details
              about your company, services, or any other relevant information.
            </p>
            <button className={` btn-primary mx-2 mb-5 self-start`}>
              adsasd
            </button>
          </div>

          {/* Second div - Image */}
          <div className='lg:w-1/2 mt-4 lg:mt-0 '>
            <img
              src='/image-030.jpg' // Replace with your actual image source
              alt='Website Image'
              className='w-full h-auto rounded-lg'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteSection;

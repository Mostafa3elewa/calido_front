import React from "react";
import Image from "next/image";
import Link from "next/link";
import {StarRating} from "@/components/shared-component/StarRating";
import {FaStar} from "react-icons/fa";
import {useMainContext} from "@/contexts/MainContext";
import AddToCartProductComponent from "./AddToCartProductComponent";
import {domain} from "@/util/axios";
export default function Product({
  name_en,
  id,
  price,
  newPrice,
  sale,
  product,
}) {
  console.log(product);
  return (
    <div className="cursor-pointer  sm:hover:shadow-slate-400 sm:shadow-md rounded-lg sm:border sm:border-gray-200 transition-shadow duration-200 group flex flex-col items-start relative">
      <Link
        href={`/singleitem/${id}`}
        aria-label="redirect to shop page">
        {/* <Image
          src={`${domain + product?.images?.length>0 && product?.images[0].name}`}
          width={500}
          height={500}
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
          className='sm:rounded-t-lg group-hover:opacity-80 transition duration-200 w-100'
          placeholder='blur'
          blurDataURL='/spinner.svg'
          alt='image not avalible'
          priority
        ></Image> */}
        <div className="p-2 flex flex-col gap-y-2">
          <div className="flex">
            <FaStar className="text-primary" />
            <FaStar className="text-primary" />
            <FaStar className="text-[#e4e5e9]" />
            <FaStar className="text-[#e4e5e9]" />
            <FaStar className="text-[#e4e5e9]" />
          </div>
          <h3 className="text-lg font-semibold">{name_en}</h3>
          <div className="flex gap-1">
            <span className="text-base font-semibold">
              {newPrice?.toFixed(2)}Egp
            </span>
            {newPrice !== price && (
              <span className="text-gray-400 line-through">
                {price?.toFixed(2)}Egp
              </span>
            )}
          </div>
        </div>
      </Link>
      <AddToCartProductComponent product={product} />
      {sale !== 0 && (
        <span className="bg-primary text-black rounded-md px-2 py-1 absolute top-[10px] left-[10px] text-sm font-semibold">
          sale!
        </span>
      )}
    </div>
  );
}

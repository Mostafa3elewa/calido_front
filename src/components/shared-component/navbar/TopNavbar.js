"use client";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import {CgProfile} from "react-icons/cg";
import {FaFacebook} from "react-icons/fa";
import {AiOutlineTwitter, AiFillInstagram} from "react-icons/ai";
import {HiMiniBars3} from "react-icons/hi2";
import CartButton from "./CartButton";
import {useMainContext} from "@/contexts/MainContext";
import Link from "next/link";
import SearchInput from "./SearchInput";
import Cookies from "js-cookie";

export default function TopNavbar() {
  const {detectNavbar, total_items} = useMainContext();
  const [isClient, setIsClient] = useState(false);
  const token = Cookies.get("calidoUser");
  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <>
      <nav className="py-3 lg:py-2 px-3 lg:px-2 container">
        <div className=" flex justify-between items-center">
          <div className="hidden lg:block items-center gap-5 ">
            {/* <FaFacebook className="cursor-pointer hover:text-primary smooth text-lg" />
            <AiOutlineTwitter className="cursor-pointer hover:text-primary smooth text-lg" />
            <AiFillInstagram className="cursor-pointer hover:text-primary smooth text-lg" /> */}
            <SearchInput />
          </div>
          <HiMiniBars3
            className="text-2xl smooth cursor-pointer hover:text-primary block lg:hidden"
            onClick={() => detectNavbar(true)}
          />
          <div class="flex justify-center items-center">
            <Link href="/" className="">
              <Image
                src="/Asset 10.png"
                width={150}
                height={0}
                alt="logo-prolighthub"
                className="mx-auto"
              />
            </Link>
          </div>

          <div className="flex items-center gap-5 ">
            {/* <div className="hidden lg:block">
              <SearchInput />
            </div> */}
            {isClient && token && (
              <Link href="/profile">
                <CgProfile className="hidden lg:block cursor-pointer hover:text-primary smooth text-2xl" />
              </Link>
            )}
            {isClient && !token && (
              <Link
                href="/signin"
                className="hidden lg:block btn-primary whitespace-nowrap">
                Sign in
              </Link>
            )}
            {/* Resonsive Mode */}
            {isClient && !token && (
              <Link
                href="/signin"
                className="block lg:hidden whitespace-nowrap">
                Sign in
              </Link>
            )}
            {isClient && token && (
              <Link href="/profile" className="block lg:hidden">
                <CgProfile className="cursor-pointer hover:text-primary smooth text-2xl" />
              </Link>
            )}

            <Link href="/cart">
              <CartButton count={total_items} />
            </Link>
          </div>
          {/* <SearchInput /> */}
        </div>
      </nav>
      <hr className="hidden lg:block text-secondary bg-secondary mx-6" />
    </>
  );
}

"use client";
import {navLiks} from "@/util/constants";
import React, {useState} from "react";
import {MdKeyboardArrowDown} from "react-icons/md";
import NavLink from "./NavLink";

export default function Navbar() {
  return (
    <nav className="hidden lg:flex justify-center items-center gap-10 my-3">
      {navLiks &&
        navLiks.map((nav) => <NavLink {...nav} key={nav.id} />)}
    </nav>
  );
}

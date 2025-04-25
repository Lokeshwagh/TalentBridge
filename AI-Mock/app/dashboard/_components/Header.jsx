"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Tb from "../../../assets/TB.png";

const Header = ({ logo }) => {
  const [isUserButtonLoaded, setUserButtonLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const SkeletonLoader = () => (
    <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setUserButtonLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const path = usePathname();

  return (
    <div className="bg-white shadow-sm">
      <div className="w-[80%] m-auto flex gap-4 items-center justify-between py-4">
        <Link className="hidden md:block" href="/dashboard">
          <Image src={Tb} width={80} height={80} alt="logo" />
        </Link>
        <ul className="hidden md:flex gap-6 text-black">
          <Link href="/dashboard">
            <li
              className={`hover:text-blue-500 transition-all cursor-pointer ${
                path == "/dashboard" && "text-blue-500 font-bold"
              }`}
            >
              Dashboard
            </li>
          </Link>
          <Link href="/">
            <li className="hover:text-blue-500 transition-all cursor-pointer font-bold">
              Go to Home
            </li>
          </Link>
        </ul>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-black">
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
        <div className="flex gap-10">
          {isUserButtonLoaded ? <UserButton /> : <SkeletonLoader />}
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white text-black p-4">
          <ul className="space-y-2">
            <Link href="/dashboard">
              <li
                className={`hover:text-blue-500 transition-all cursor-pointer ${
                  path == "/dashboard" && "text-blue-500 font-bold"
                }`}
              >
                Dashboard
              </li>
            </Link>
            <Link href="/">
              <li className="hover:text-blue-500 transition-all cursor-pointer font-bold">
                Go to Home
              </li>
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;

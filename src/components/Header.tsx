import React from "react";
import Image from "next/image";
import Link from "next/link";

const Header: React.FC<{ title: string }> = ({ title }) => {
  return (
    <nav 
    className="flex items-center justify-between text-white text-left py-4 w-full bg-gradient-to-r from-blue-700 to-blue-500"
    style={{
      fontFamily: '"Roboto", sans-serif'
    }}
  >
      
      <div className="flex items-center ml-10">
        <Image src="/water.png" width={60} height={60} alt="Logo" />
        <h1 className="ml-5 mt-1 text-2xl font-semibold text-white">{title}</h1>
      </div>

      <div className="mr-10 flex space-x-10">
        <Link href="/" className="text-white hover:text-blue-300 cursor-pointer text-xl font-semibold">Dashboard</Link>
        <Link href="/borrowers" className="text-white hover:text-blue-300 cursor-pointer text-xl font-semibold">BorrowerList</Link>
      </div>

    </nav>
  );
};

export default Header;

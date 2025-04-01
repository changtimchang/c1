import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import logo from "../public/logo.png";

const Navbar = () => {
  return (
    <div className="bg-amber-500 conatiner w-auto py-4 flex items-center justify-between">
      <div className="px-4">
        <Image src={logo} alt="company logo" width={200} placeholder="blur"/>
      </div>
      <div className="text-2xl font-bold">
        다이캐스팅 최적설계 AI 예측 플랫폼
      </div>
      <div className="px-4">
        <Button>Logout</Button>
      </div>
    </div>
  );
};

export default Navbar;

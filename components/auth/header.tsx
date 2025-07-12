import React from "react";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
}

const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center">
      <h1 className={cn("text-3xl font-semibold text-white", font.className)}>
        HACKBYTE CODEX
      </h1>
      <p className=" text-lg font-medium text-[#38caf3]">{label}</p>
    </div>
  );
};

export default Header;

"use client";

import React from "react";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Header from "@/components/auth/header";
import Social from "@/components/auth/social";
import BackButton from "./back-button";

interface CardWraperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

const CardWrapper = ({
  children,
  showSocial,
  backButtonLabel,
  headerLabel,
  backButtonHref,
}: CardWraperProps) => {
  return (
    <div className="w-full max-w-[400px] mx-auto p-4 shadow-md rounded-md ">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter className="py-2 gap-y-2 text-white">
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </div>
  );
};

export default CardWrapper;

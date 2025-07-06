// src/hooks/use-client-session.ts
"use client";
import { auth } from "@/lib/auth";

export const useClientSession = async () =>  {
    const session = await auth();

    return session
  
 
}

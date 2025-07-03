import { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  userName: string;
  id: string;
 
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    userName?: string;
    id?:string;
  }
}

import Credentials from "next-auth/providers/credentials";

import Google from "next-auth/providers/google";
// import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
// import { LoginSchema } from "@/schemas/AuthSchema";
// import { getUserByEmail } from "@/data/user";

export default {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    // Credentials({
    //   async authorize(credentials) {
    //     const validatedFields = LoginSchema.safeParse(credentials);

    //     if (validatedFields.success) {
    //       const { email, password } = validatedFields.data;

    //       const user = await getUserByEmail(email);

    //       if (!user || !user.password) return null;

    //       const passwordMatch = await bcrypt.compare(password, user.password);

    //       if (passwordMatch) return user;
    //     }

    //     return null;
    //   },
    // }),
  ],
} satisfies NextAuthConfig;

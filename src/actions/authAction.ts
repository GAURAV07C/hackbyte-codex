"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { LoginSchema, RegisterSchema, ResetSchema } from "@/schemas/AuthSchema";
import { getUserByEmail } from "@/data/user";
import { signIn } from "@/lib/auth";
import { generatePasswordToken, generateVerificationToken } from "@/lib/tokens";
import { sendPasswordResendEmail, sendVerificationEmail } from "@/lib/mail";
import { validate } from "@/lib/validate";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const { data, error } = validate(LoginSchema, values);
  if (error) return { success: false, message: error };

  const { email, password } = data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { success: false, message: "Email does not exist!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: true, message: "Confirmation email sent!" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return { success: true, message: "Login successful!" };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error?.type === "CredentialsSignin") {
      return { success: false, message: "Invalid credentials!" };
    }

    // Log the error internally
    console.error("Login error:", error);

    // Never expose error object to client
    return { success: false, message: "Something went wrong!", error: error };
  }
};

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const { data, error } = validate(RegisterSchema, values);
  if (error) return { success: false, message: error };

  const { email, password, name } = data;

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { success: false, message: "Email already in use!" };
  }

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  const userName = email.split("@")[0];

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      userName: userName || "",
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: true, message: "Confirmation email sent!" };
};

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const { data, error } = validate(ResetSchema, values);
  if (error) return { success: false, message: error };

  const { email } = data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { success: false, message: "Email not found" };
  }

  const passwordResetToken = await generatePasswordToken(email);
  await sendPasswordResendEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: true, message: "Reset email sent!" };
};

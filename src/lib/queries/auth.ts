"use client";

import { useMutation } from "@tanstack/react-query";
import { LoginSchema, RegisterSchema } from "@/schemas/AuthSchema";
// server actions ko import karenge
import { login, register, reset } from "@/actions/authAction";

import { z } from "zod";

// ✅ Login mutation
export function useLogin() {
  return useMutation({
    mutationFn: async (values: z.infer<typeof LoginSchema>) => {
      const result = LoginSchema.safeParse(values);

      if (!result.success) {
        throw result.error;
      }

      return await login(result.data);
    },
  });
}

// ✅ Register mutation
export function useRegister() {
  return useMutation({
    mutationFn: async (values: z.infer<typeof RegisterSchema>) => {
      const result = RegisterSchema.safeParse(values);

      if (!result.success) {
        throw result.error;
      }

      return await register(result.data);
    },
  });
}

// ✅ Reset mutation
export function useReset() {
  return useMutation({
    mutationFn: reset,
  });
}

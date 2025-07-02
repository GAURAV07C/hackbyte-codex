"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Loader2, Mail, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CardWrapper from "./card-wrapper";

import { LoginSchema } from "@/schemas/AuthSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import FormError from "@/components/form-error";
import FormSucess from "@/components/form-sucess";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/lib/queries/auth";

interface LoginDialogProps {
  children: React.ReactNode;
}

export function LoginDialog({ children }: LoginDialogProps) {
  const [open, setOpen] = useState(false);

  const { mutate, isPending } = useLogin();

  const { toast } = useToast();

  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email is Already in use with Different Provided"
      : "";
  const [error, setError] = useState<string | undefined>("");
  const [sucess, setSucess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    mutate(values, {
      onSuccess: (data) => {
        if (data.success) {
          setSucess("Login successful");
          toast({
            title: "Loggin successFully",
          });
          toast({ title: "Logged in!" });
          router.push("/dashboard");
          form.reset();
          setOpen(false);
        } else {
          toast({
            title: "Signup failed",
            description: data.message as string,
            variant: "destructive",
          });
        }
      },
      onError: (error) => {
        toast({
          title: "Something went wrong",
          description:
            error instanceof z.ZodError
              ? "Validation Error"
              : "Please try again.",
          variant: "destructive",
        });
        setError(error.message);
      },
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 border-gray-700">
        <CardWrapper
          headerLabel="Create an account "
          backButtonLabel="Already have an account?"
          backButtonHref="/auth/login"
          showSocial
        >
          <DialogHeader>
            <DialogDescription className="text-gray-400 font-medium text-sm">
              Enter your credentials to access your account
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <motion.form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 py-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              disabled={isPending}
                              {...field}
                              placeholder="Enter your email"
                              type="email"
                              className="pl-10 bg-gray-800 border-gray-600 text-white"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              {...field}
                              disabled={isPending}
                              placeholder="Create a password (min 6 characters)"
                              className="pl-10 bg-gray-800 border-gray-600 text-white"
                              type="password"
                              minLength={6}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <FormError message={error || urlError} />
              <FormSucess message={sucess} />
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </motion.form>
          </Form>
        </CardWrapper>
      </DialogContent>
    </Dialog>
  );
}

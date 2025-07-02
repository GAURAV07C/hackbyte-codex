"use client";

import type React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterSchema } from "@/schemas/AuthSchema";
import { useRegister } from "@/lib/queries/auth";
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

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { motion } from "framer-motion";
import { Loader2, Mail, Lock, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CardWrapper from "./card-wrapper";
import { DialogTitle } from "@radix-ui/react-dialog";

interface SignupDialogProps {
  children: React.ReactNode;
}

export function SignupDialog({ children }: SignupDialogProps) {
  const [error, setError] = useState<string | undefined>("");
  const [sucess, setSucess] = useState<string | boolean | undefined>("");

  const { mutate, isPending } = useRegister();

  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      confirm_password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    mutate(values, {
      onSuccess: (data) => {
        if (data.success) {
          setSucess(data.success);
          toast({
            title: "Confirmation email.sent",
          });
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
            <DialogTitle></DialogTitle>
            <DialogDescription className="text-gray-400 font-medium text-sm">
              Join <span className="text-[#1edaa5]"> HACKBYTE CODEX </span> to
              access exclusive webinars
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
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Name</FormLabel>

                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            disabled={isPending}
                            {...field}
                            placeholder="Enter your full name"
                            type="text"
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
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="confirm_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="Enter confirm password"
                            className="pl-10 bg-gray-800 border-gray-600 text-white"
                            type="password"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormError message={error} />
              <FormSucess
                message={
                  typeof sucess === "string"
                    ? sucess
                    : sucess
                    ? "Success"
                    : undefined
                }
              />
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin " />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </motion.form>
          </Form>
        </CardWrapper>
      </DialogContent>
    </Dialog>
  );
}

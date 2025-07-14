"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import {
  LoginPayload,
  loginValidation,
} from "@/components/parts/login/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "@/components/parts/login/api";
import Cookie from "js-cookie";
import Swal from "sweetalert2";
import useShowErrors from "@/hooks/useShowErrors";
import { Form } from "@/components/ui/form";
import { CustomFormInput } from "@/components/shared/forms/customFormInput";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const t = useTranslations("auth");

  const form = useForm<LoginPayload>({
    resolver: zodResolver(loginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = form;

  const loginMutation = useLoginMutation(setError);

  const onSubmit = (data: LoginPayload) => {
    // Handle form submission
    loginMutation.mutate(data, {
      onSuccess: async (response) => {
        Cookie.set("accessToken", response.data.token);
        router.push("/dashboard");
      },
    });
  };

  return (
    <main className="flex-1">
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              {t("login")}
            </h1>
            <p className="text-sm text-muted-foreground">
              {t("message-login")}
            </p>
          </div>
          <div className="grid gap-6">
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4">
                  <CustomFormInput<LoginPayload>
                    name="email"
                    label="Email/ NIK"
                    placeholder="Login menggunakan NIK/Email"
                    required
                  />
                  <CustomFormInput<LoginPayload>
                    name="password"
                    label="Kata Sandi"
                    placeholder="••••••••"
                    type="password"
                    required
                  />
                  <Button type="submit">{t("login")}</Button>
                </div>
              </form>
            </Form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  {t("message-other-login")}
                </span>
              </div>
            </div>
            <div className="grid gap-2">
              <Button variant="outline" type="button">
                Google
              </Button>
              <Button variant="outline" type="button">
                GitHub
              </Button>
            </div>
          </div>
          <p className="px-8 text-center text-sm text-muted-foreground">
            {t("not-have-account")}{" "}
            <Link
              href="/register"
              className="text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              {t("register")}
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

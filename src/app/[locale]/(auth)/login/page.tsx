"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CustomFormInput } from "@/components/shared/forms/customFormInput";
import { useLoginMutation } from "@/components/parts/login/api";
import {
  LoginPayload,
  loginValidation,
} from "@/components/parts/login/validation";

export default function LoginPage() {
  const router = useRouter();

  const form = useForm<LoginPayload>({
    resolver: zodResolver(loginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = form;

  const loginMutation = useLoginMutation(setError);

  const onSubmit = (data: LoginPayload) => {
    loginMutation.mutate(data, {
      onSuccess: async (response) => {
        Cookie.set("accessToken", response.data.token);
        router.push("/dashboard");
      },
    });
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-[#00819B] via-[#FFFBE5] to-[#D1AC3B] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-[#FFFBE5] rounded-xl shadow-xl overflow-hidden">
        {/* Left Section */}
        <div className="hidden md:flex flex-col justify-center items-center bg-[#00819B] text-white p-10 relative">
          <h2 className="text-3xl font-bold mb-4 text-center drop-shadow-lg">
            Selamat Datang
          </h2>
          <p className="text-sm text-center max-w-sm drop-shadow-md">
            Masuk untuk mulai mengakses tampilan dan fitur admin dari Dongans Billiard.
          </p>
        </div>

        {/* Right Section (Form) */}
        <div className="p-6 sm:p-8 space-y-6">
          <h1 className="text-2xl font-bold text-[#00819B] text-center">
            Login
          </h1>

          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <CustomFormInput<LoginPayload>
                name="email"
                label="Email"
                placeholder="Masukkan email anda"
                required
              />
              <CustomFormInput<LoginPayload>
                name="password"
                label="Kata Sandi"
                placeholder="••••••••"
                type="password"
                required
              />
              <Button
                type="submit"
                className="w-full bg-[#00819B] hover:bg-[#006B6F] text-white font-semibold"
                disabled={isSubmitting}
              >
                Masuk
              </Button>
            </form>
          </Form>

          <div className="text-center text-sm text-gray-600">
            <Link
              href="/"
              className="text-[#00819B] font-semibold hover:underline"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

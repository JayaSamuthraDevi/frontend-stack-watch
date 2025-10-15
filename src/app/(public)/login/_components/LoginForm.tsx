"use client";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Checkbox,
} from "@carbon/react";
import { useLoginMutation } from "@/store/api/authApi";
import { LoginFormType, loginSchema } from "@/util/authValidations";
import Link from "next/link";
import { useToast } from "@/contexts/ToastContext";
import Image from "next/image";
import help_icon from "../../../../../public/assets/icons/help.svg";
import { LogoGithub } from "@carbon/icons-react";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/dashboard";
  const toast = useToast();
  const [form, setForm] = useState<LoginFormType & { rememberMe: boolean }>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof LoginFormType, string>>
  >({});

  const [login, { isLoading }] = useLoginMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
    setFormErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});
    const parsed = loginSchema.safeParse({
      email: form.email,
      password: form.password,
    });
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof LoginFormType, string>> = {};
      for (const err of parsed.error.issues) {
        const field = err.path[0] as keyof LoginFormType;
        fieldErrors[field] = err.message;
      }
      setFormErrors(fieldErrors);
      return;
    }
    try {
      await login({
        email: form.email,
        password: form.password,
        rememberMe: form.rememberMe,
      }).unwrap();

      toast.showToast({
        kind: "success",
        title: "Login successful",
      });

      router.push(from);
    } catch (err: any) {
      toast.showToast({
        kind: "error",
        title: "Login failed",
        subtitle:
          err?.data?.message ||
          err?.message ||
          "Please check your credentials and try again.",
      });
    }
  };

  // Social login handlers
  const handleGoogleLogin = () => {
    router.push("/auth/google"); // adjust to your backend OAuth route
  };

  const handleGithubLogin = () => {
    router.push("/auth/github"); // adjust to your backend OAuth route
  };

  return (
    <>
      <h3>Login</h3>
      <div className="cds--type-body-compact-01 mt-2">
        <span>Don&apos;t have an account? </span>
        <Link href="/signup" className="link_text">
          Sign up
        </Link>
      </div>

      <hr className="cds--divider cds--divider--horizontal my-6" />

      <form onSubmit={handleSubmit} autoComplete="off" style={{ minWidth: 320 }}>
        <Stack gap={6}>
          <TextInput
            id="login-email"
            name="email"
            type="email"
            labelText="Email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
            size="lg"
            invalid={!!formErrors.email}
            invalidText={formErrors.email}
          />
          <PasswordInput
            id="login-password"
            name="password"
            labelText="Password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            required
            size="lg"
            invalid={!!formErrors.password}
            invalidText={formErrors.password}
          />

          {/* Remember Me + Forgot Password */}
          <div className="flex justify-between items-center">
            <Checkbox
              id="remember-me"
              name="rememberMe"
              labelText="Remember me"
              checked={form.rememberMe}
              onChange={handleChange}
            />
            <Link href="#forgot-password" className="link_text text-sm">
              Forgot Password?
            </Link>
          </div>

          <Button
            type="submit"
            kind="primary"
            size="lg"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Logging In..." : "Login"}
          </Button>

          <p className="cds--type-label-01 flex gap-1 items-center">
            <Image src={help_icon} alt="logo" width="15" height={15} />
            Need help logging in?
          </p>
        </Stack>

        <hr className="cds--divider cds--divider--horizontal my-6" />

        {/* Social Login Section */}
        <Stack gap={4} className="w-full">
          <Button
          kind="tertiary"
          size="lg"
          renderIcon={LogoGithub}
          iconDescription="Login with Google"
          onClick={handleGoogleLogin}
        >
          Continue with Google
        </Button>

          <Button
            kind="tertiary"
            size="lg"
            renderIcon={LogoGithub}
            iconDescription="Login with GitHub"
            onClick={handleGithubLogin}
          >
            Continue with GitHub
          </Button>
        </Stack>
      </form>
    </>
  );
}

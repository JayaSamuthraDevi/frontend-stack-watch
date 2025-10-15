"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  TextInput,
  Button,
  Stack,
} from "@carbon/react";
import { useSignupMutation } from "@/store/api/authApi";
import { SignupFormType, signupSchema } from "@/util/authValidations";
import Link from "next/link";
import { useToast } from "@/contexts/ToastContext";

export default function SignupForm() {
  const router = useRouter();
  const toast = useToast();

  const [form, setForm] = useState<SignupFormType>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof SignupFormType, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    try {
      signupSchema.pick({ [name]: true } as any).parse({ [name]: value });
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    } catch (err: any) {
      const issue = err?.issues?.[0];
      const message = issue?.message || "Invalid input";
      setFormErrors((prev) => ({ ...prev, [name]: message }));
    }
  }

  const [signup, { isLoading }] = useSignupMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});
    const parsed = signupSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof SignupFormType, string>> = {};
      for (const err of parsed.error.issues) {
        const field = err.path[0] as keyof SignupFormType;
        fieldErrors[field] = err.message;
      }
      setFormErrors(fieldErrors);
      return;
    }
    try {
      await signup({
        username: form.name,
        email: form.email,
        password: form.password,
      }).unwrap();
      toast.showToast({
        kind: "success",
        title: "Signup successful",
      });
      router.push("/login");
    } catch (err: any) {
      console.error("Signup error:", err);
      toast.showToast({
        kind: "error",
        title: "Signup failed",
        subtitle: err?.data?.detail || err?.message,
      });
    }
  };
  return (

    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      style={{ minWidth: 320 }}
    >
      <div>
        <Stack gap={6}>
          <TextInput
            id="signup-name"
            name="name"
            labelText="Name"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            size="lg"
            invalid={!!formErrors.name}
            invalidText={formErrors.name}
          />
          <TextInput
            id="signup-email"
            name="email"
            type="email"
            labelText="Email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            size="lg"
            invalid={!!formErrors.email}
            invalidText={formErrors.email}
          />
          <TextInput
            id="signup-password"
            name="password"
            type="password"
            labelText="Password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            size="lg"
            invalid={!!formErrors.password}
            invalidText={formErrors.password}
          />
          <TextInput
            id="signup-confirm-password"
            name="confirmPassword"
            type="password"
            labelText="Confirm Password"
            placeholder="Re-enter your password"
            value={form.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            size="lg"
            invalid={!!formErrors.confirmPassword}
            invalidText={formErrors.confirmPassword}
          />
          <div className="justify-center ">
            <Button
              type="submit"
              kind="primary"
              size="lg"
              className="text-center"
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </Button>
          </div>
          <div className="link_section">
            <span>Already have an account? </span>
            <Link href="/login" className="link_text">
              Login
            </Link>
          </div>
        </Stack>
      </div>
    </form>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosPublic from "@/lib/Axios/AxiosPublic";
import { cn } from "@/lib/utils";
import { SignInImage } from "@/public/assets/assets";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import OAuth from "./OAuth";
import ForgotPasswordModal from "../mainComponents/modal/ForgotPasswordModal";

export function LoginForm({ className, ...props }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axiosPublic.post("/api/auth/login", formData);
      if (data?.success) {
        toast.success(data.message || "Login successful!");
        router.push(`/verify/${formData?.email}`);
        setLoading(false);
        // if (data?.user?.isAdmin) {
        //   router.push("/dashboard");
        // } else {
        //   router.push("/");
        // }
      }
    } catch (error) {
      toast.error("Login failed!");
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome To MeetUpBD</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your MeetUpBD account
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <div className="flex self-end">
                    <div className="ml-auto">
                      <ForgotPasswordModal />
                    </div>
                  </div>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              {loading ? (
                <Button disabled>
                  <Loader2Icon className="animate-spin" />
                  Login
                </Button>
              ) : (
                <Button type="submit" className="w-full">
                  Login
                </Button>
              )}

              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              {/* Social Buttons (same as in your SignUpForm) */}
              <div className="grid grid-cols-1 gap-4">
                {/* Google */}
                <OAuth />
              </div>
              <div className="text-center text-sm">
                Don't have an account?{" "}
                <Link href="/signup" className="underline underline-offset-4">
                  Sign Up
                </Link>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <Image
              src={SignInImage}
              fill
              alt="Image"
              placeholder="blur"
              className="object-cover h-full w-full dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}

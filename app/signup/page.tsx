"use client";

import FormComponent from "@/components/FormComponent";
import useAuthStore from "@/store/authStore";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const { resetAuthState } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const handlesubmit = async (
    email: string,
    password: string,
    name?: string
  ) => {
    try {
      setLoading(true);
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        resetAuthState();
        router.push("/login");
        console.log(data);
      } else {
        toast.error(data.message);
        console.log(response);
      }
    } catch (error) {
      toast.error("Signup failed");
      console.error("Signup failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormComponent
      formType="signup"
      onSubmit={handlesubmit}
      imageurl="background-purple.jpg"
      className="indigo"
      loading={loading}
    />
  );
}

"use client";

import FormComponent from "@/components/FormComponent";
import useAuthStore from "@/store/authStore";
import { toast } from "sonner";

export default function LoginPage() {
  const { resetAuthState } = useAuthStore();
  const handlesubmit = async (email: string, password: string) => {
    // e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Login successful");
      resetAuthState();
      // Redirect or do something on successful login
    } else {
      toast.error("Login failed");
      console.error("Login failed:", data.message);
    }
  };

  return (
    <FormComponent
      formType="login"
      onSubmit={handlesubmit}
      imageurl="background-green.jpg"
      className="red"
    />
  );
}

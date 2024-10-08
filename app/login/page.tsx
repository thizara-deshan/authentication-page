"use client";

import FormComponent from "@/components/FormComponent";
import useAuthStore from "@/store/authStore";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const { resetAuthState } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const handlesubmit = async (email: string, password: string) => {
    // e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        resetAuthState();
        // Redirect or do something on successful login
      } else {
        toast.error(data.message);
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      toast.error("Login failed");
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormComponent
      formType="login"
      onSubmit={handlesubmit}
      imageurl="background-green.jpg"
      className="red"
      loading={loading}
    />
  );
}

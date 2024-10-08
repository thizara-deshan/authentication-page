"use client";

import FormComponent from "@/components/FormComponent";
import useAuthStore from "@/store/authStore";
import { toast } from "sonner";
export default function SignUpPage() {
  const { resetAuthState } = useAuthStore();

  const handlesubmit = async (
    email: string,
    password: string,
    name?: string
  ) => {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success("Signup successful");
      resetAuthState();
      console.log(data);
    } else {
      toast.error("Signup failed");
      console.log(data);
    }
  };

  return (
    <FormComponent
      formType="signup"
      onSubmit={handlesubmit}
      imageurl="background-purple.jpg"
      className="indigo"
    />
  );
}

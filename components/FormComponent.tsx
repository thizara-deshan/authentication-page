import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import useAuthStore from "@/store/authStore";
import Image from "next/image";
import { useState } from "react";
import { svg } from "./ui/svg";
import Link from "next/link";

interface AuthFormProps {
  formType: "login" | "signup";
  onSubmit: (email: string, password: string, name?: string) => Promise<void>;
  imageurl: string;
  className: string;
  loading?: boolean;
}

export default function AuthForm({
  formType,
  onSubmit,
  imageurl,
  className,
  loading,
}: AuthFormProps) {
  const {
    name,
    email,
    password,
    setName,
    setEmail,
    setPassword,
    // resetAuthState,
  } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formType === "signup") {
      onSubmit(email, password, name);
    } else {
      onSubmit(email, password);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left side - Purple background image */}
      <div className="hidden lg:block lg:w-1/2">
        <Image
          src={`/${imageurl}`}
          alt="background"
          width={1080}
          height={1080}
          className="h-full w-full object-cover rounded-br-[6.5rem]"
        />
      </div>

      {/* Right side - Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md text-center lg:text-left">
          <h1
            className={`${
              formType == "login" ? "text-green-900" : "text-indigo-900"
            } text-4xl font-bold mb-2`}
          >
            {formType == "login" ? "Login" : "Sign Up"}
          </h1>
          <p className="text-gray-600 mb-8 ">
            {formType == "login"
              ? "Please enter your login details to have fun"
              : "Create your account in seconds!"}
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {formType === "signup" && (
              <div className="relative">
                <label
                  htmlFor="name"
                  className="absolute top-0 left-3 text-[0.55rem] text-gray-500 mr-2 mt-1"
                >
                  Full Name
                </label>
                <div>
                  <Input
                    name="name"
                    type="text"
                    placeholder="Enter Your Name"
                    className="w-full py-7"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            )}
            <div>
              <div className="relative">
                <label
                  htmlFor="email"
                  className="absolute top-0 left-3 text-[0.55rem] text-gray-500 mr-2 mt-1"
                >
                  Email Address
                </label>
                <Input
                  name="email"
                  type="email"
                  placeholder="info@example.com"
                  className="w-full py-7"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="relative">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full pr-10 py-7"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center font-normal ">
                <Checkbox id="keep-logged-in" />
                <label
                  htmlFor="keep-logged-in"
                  className="ml-2 text-base text-gray-600"
                >
                  {formType == "login" ? (
                    `Keep me logged in`
                  ) : (
                    <>
                      I agree to the{" "}
                      <a
                        href="#"
                        className={`text-${className}-600 hover:underline`}
                      >
                        Terms of Service
                      </a>
                    </>
                  )}
                </label>
              </div>
            </div>
            {loading == false ? (
              <Button
                type="submit"
                className={`w-full ${
                  formType == "login" ? "bg-green-600" : "bg-indigo-600"
                } ${
                  formType == "login"
                    ? "hover:bg-green-700"
                    : "hover:bg-indigo-700"
                } text-xl py-6`}
              >
                {formType == "login" ? "Login" : "Sign Up"}
              </Button>
            ) : (
              <Button
                type="submit"
                className={`w-full ${
                  formType == "login" ? "bg-green-600" : "bg-indigo-600"
                } ${
                  formType == "login"
                    ? "hover:bg-green-700"
                    : "hover:bg-indigo-700"
                } text-xl py-6`}
                disabled
              >
                Loading...
              </Button>
            )}
          </form>

          <p className="mt-8 text-center text-base text-gray-600">
            {
              // eslint-disable-next-line no-nested-ternary
              formType == "login" ? (
                <>
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/signup"
                    className={`${
                      formType == "login" ? "text-green-600" : "text-indigo-600"
                    } hover:underline`}
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className={`${
                      formType == "signup"
                        ? "text-indigo-600"
                        : "text-green-600"
                    } hover:underline`}
                  >
                    Login
                  </Link>
                </>
              )
            }
          </p>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-4 gap-3">
              {svg.map((provider) => (
                <Button
                  key={provider.name}
                  variant="outline"
                  className={`w-full py-6 ${
                    formType == "login" ? "bg-green-600" : "bg-indigo-600"
                  } ${
                    formType == "login"
                      ? "hover:bg-green-700"
                      : "hover:bg-indigo-700"
                  }`}
                >
                  <span className="sr-only">Sign in with {provider.name}</span>
                  <div>
                    {provider.svg}
                    <span className="sr-only">{provider.name}</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

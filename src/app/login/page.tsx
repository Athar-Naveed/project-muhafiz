"use client";
import Link from "next/link";
import { Shield } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { LoginType } from "@/types";
import { loginHandler } from "@/handlers/reglo";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function Login() {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const route = useRouter();
  const handleLogin = async (values: LoginType) => {
    setLoading(true);
    try {
      const resp = await loginHandler(values);

      if (resp.status == 200) {
        toast.success("Welcome to Hifazat!", {
          duration: 3000,
          position: "top-center",
        });

        route.push("/hifazat");
      } else if (resp.status == 401) {
        setMessage(resp.response.error);
      }
    } catch (error: any) {
      setMessage(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 to-white px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md animate-fadeIn">
        <div className="flex flex-col items-center space-y-6">
          <Shield className="h-12 w-12 text-orange-500" />
          <h1 className="text-2xl font-semibold text-black">Welcome Back</h1>

          <Formik
            initialValues={{ email: "", password: "", whereTo: "login" }}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
          >
            {({ errors, touched }) => (
              <Form className="w-full space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-600" htmlFor="email">
                    Email
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className={`w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-orange-500 ${
                      errors.email && touched.email
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-600" htmlFor="password">
                    Password
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    className={`w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-orange-500 ${
                      errors.password && touched.password
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <button
                  disabled={loading}
                  type="submit"
                  className={`w-full py-2 px-4 ${
                    loading && "bg-[#121212]"
                  } bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2`}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </Form>
            )}
          </Formik>
          <Toaster />
          {message && (
            <div className="error bg-red-500 px-6 py-2 text-white">
              {message}
            </div>
          )}
          <p className="text-sm text-gray-500">
            Don&apos;t have an account?
            <Link href="/signup" className="text-orange-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

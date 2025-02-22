"use client";
import Link from "next/link";
import { Shield } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function Signup() {
  const handleSignup = (values: { email: string; password: string }) => {
    // Signup logic will be implemented later
    console.log("Signup attempt", values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 to-white px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md animate-fadeIn">
        <div className="flex flex-col items-center space-y-6">
          <Shield className="h-12 w-12 text-orange-500" />
          <h1 className="text-2xl font-semibold text-black">Welcome!</h1>

          <Formik
            initialValues={{ fullName: "", email: "", password: "" }}
            validationSchema={SignupSchema}
            onSubmit={handleSignup}
          >
            {({ errors, touched }) => (
              <Form className="w-full space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-600" htmlFor="fullName">
                    Full Name
                  </label>
                  <Field
                    id="fullName"
                    name="fullName"
                    type="fullName"
                    placeholder="Enter your full name..."
                    className={`w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-orange-500 ${
                      errors.fullName && touched.fullName
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  <ErrorMessage
                    name="fullName"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
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
                  type="submit"
                  className="w-full py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                  Login
                </button>
              </Form>
            )}
          </Formik>

          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-orange-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

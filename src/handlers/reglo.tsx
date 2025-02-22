import { LoginType, SignUpType } from "@/types";

export const signupHandler = async (values: SignUpType) => {
  try {
    const res = await fetch("/api/auth/reglo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const response = await res.json();
    return { response, status: res.status };
  } catch (error: any) {
    return { message: error, status: error.status };
  }
};
export const loginHandler = async (values: LoginType) => {
  try {
    const res = await fetch("/api/auth/reglo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const response = await res.json();
    return { response, status: res.status };
  } catch (error: any) {
    return { message: error, status: error.status };
  }
};

export const signupHandler = (values: any, route: any) => {
  console.log("Signup attempt", values);
  route.push("/login");
};

export const loginHandler = (values: any, route: any) => {
  console.log("Login attempt", values);
  route.push("/login");
};

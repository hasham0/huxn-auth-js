"use server";
import bcryptjs from "bcryptjs";
import User from "@/models/user.model";
import { redirect } from "next/navigation";
import dbConnection from "@/db/dbConnect";
import { signIn } from "@/lib/auth";

// note: Register funtion:
const registerFunc = async (formData: FormData) => {
  const firstname = formData.get("firstname") as string | undefined;
  const lastname = formData.get("lastname") as string | undefined;
  const email = formData.get("email") as string | undefined;
  const password = formData.get("password") as string | undefined;

  // check fields if any one is empty
  if (
    [firstname, lastname, email, password].some((item) => item?.trim() === "")
  ) {
    throw new Error("please fill all the fields");
  }

  // connect database
  await dbConnection();

  // check existing user
  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    throw new Error("user already exist");
  }

  // hashed password
  const hashedPassword = await bcryptjs.hash(password as string, 12);

  // create new user
  const user = await User.create({
    firstname,
    lastname,
    email,
    password: hashedPassword,
  });

  // redirect to login page
  redirect("/login");
};

// note: Login funtion:
const loginFunc = async (formData: FormData) => {
  const email = formData.get("email") as string | undefined;
  const password = formData.get("password") as string | undefined;

  // check fields if any one is empty
  if ([email, password].some((item) => item?.trim() === "")) {
    throw new Error("please fill all the fields");
  }

  // connect database
  await dbConnection();

  // check existing user
  const isUserExist = await User.findOne({ email }).select("+password");
  if (!isUserExist) {
    throw new Error("invalid email or  password");
  }

  // compare password
  const hashedPassword = await bcryptjs.compare(
    password as string,
    isUserExist.password
  );
  if (!hashedPassword) {
    throw new Error("invalid email or  password");
  }

  // redirect to home page
  redirect("/");
};

// note: Google signIn funtion:
const googleSignInFunc = async () => {
  const googlePro = await signIn("google", { redirectTo: "/" });
};

// note: Github signIn funtion:
const githubSignInFunc = async () => {
  const githubPro = await signIn("github", { redirectTo: "/" });
};

// note: Facebook signIn funtion:
const facebookSignInFunc = async () => {
  const facebookPro = await signIn("facebook", { redirectTo: "/" });
};

export {
  registerFunc,
  loginFunc,
  githubSignInFunc,
  googleSignInFunc,
  facebookSignInFunc,
};

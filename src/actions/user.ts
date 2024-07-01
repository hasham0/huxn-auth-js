"use server";
import bcryptjs from "bcryptjs";
import User from "@/models/user.model";
import { redirect } from "next/navigation";
import dbConnection from "@/db/dbConnect";
import { signIn } from "@/lib/auth";
import { CredentialsSignin, User as AuthUser } from "next-auth";

// note: Register funtion:
const registerFunc = async (formData: FormData) => {
  try {
    const firstname = formData.get("firstname") as string | undefined;
    const lastname = formData.get("lastname") as string | undefined;
    const email = formData.get("email") as string | undefined;
    const password = formData.get("password") as string | undefined;

    // Check if any field is empty
    if ([firstname, lastname, email, password].some((item) => !item?.trim())) {
      throw new Error("Please fill all the fields");
    }

    // Connect to the database
    await dbConnection();

    // Check if user already exists
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      throw new Error("User already exists");
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password as string, 12);

    // Create new user
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });
    console.log("user created successfully");
    // Redirect to login page
  } catch (error) {
    const err = error as CredentialsSignin;
    return err.cause;
  }
  redirect("/login");
};
// note: Login funtion:
const loginFunc = async (formData: FormData) => {
  try {
    const email = formData.get("email") as string | undefined;
    const password = formData.get("password") as string | undefined;

    // check fields if any one is empty
    if ([email, password].some((item) => item?.trim() === "")) {
      throw new Error("please fill all the fields");
    }
    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email: email,
      password: password,
    });
  } catch (error) {
    const err = error as CredentialsSignin;
    return err.message;
  }
  redirect("/");
};
// note: Get all User funtion:
const fetchAllUSer = async () => {
  const users = await User.find({});
  console.log("🚀 ~ fetchAllUSer ~ users:", users);

  if (!users) {
    throw new Error("users not found");
  }
  return users;
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
  fetchAllUSer,
};

'use server';

import { signIn } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import ratelimit from "../ratelimit";
import { redirect } from "next/navigation";
import { signOut as authSignOut } from '@/auth';


export const signUp = async (params: AuthCredentials): Promise<{ success: boolean; error?: string }> => {
  const { fullName, email, universityId,university, password, universityCard } = params;

  // Check if the user already exists
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

    const ip = (await headers()).get('x-forwarded-for') || "127.0.0.1"
    const {success} = await ratelimit.limit(ip)

    if (!success) {
      redirect("/too-fast")
    }


  if (existingUser.length > 0) {
    return { success: false, error: "User already exists" };
  }

  // Hash the password
  const hashedPassword = await hash(password, 10);

  
  try {
    // Insert the new user into the database
    await db.insert(users).values({
      fullName,
      email,
     university,
      universityId,
      password: hashedPassword,
      universityCard,
    });

    signInWithCredentials({email,password});
    if (success) {
      redirect('/')
    }
    return { success: true };
  } catch (err) {
    console.error("Signup error:", err);
    return {
      success: false,
      error: "An error occurred while creating the account. Please try again.",
    };
  }
};

export const signInWithCredentials= async (params:Pick<AuthCredentials, "email" | "password">) => {
  const {email,password} = params;

     const ip = (await headers()).get('x-forwarded-for') || "127.0.0.1"
    const {success} = await ratelimit.limit(ip)

    if (!success) {
      redirect("/too-fast")
    }

  try {
    const result = await signIn("credentials" , {
      email,
      password,
      redirect:false
    })

    if (result?.error) {
      return {success:false , error:result.error}
    }

    return {success:true}
  } catch (error) {
    console.log(error, "signin error");
    return {success:false , error:"signin error"}
    
  }
}


export async function signOut() {
  await authSignOut();
}

export const getStudentDetails = async (email: string) => {
  try {
    // Query the database for the student by email
    const student = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (student.length === 0) {
      return { success: false, error: "Student not found" };
    }

    return { success: true, data: student[0] };
  } catch (error) {
    console.error("Error fetching student details:", error);
    return {
      success: false,
      error: "An error occurred while fetching student details.",
    };
  }
};
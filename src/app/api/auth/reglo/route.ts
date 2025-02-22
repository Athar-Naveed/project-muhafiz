import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { registeredUsers } from "@/db/schema";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
export async function POST(request: NextRequest) {
  const cookie = await cookies();
  const { name, email, password, whereTo } = await request.json();
  if (whereTo.includes("signin")) {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const checkUser = await db
        .select()
        .from(registeredUsers)
        .where(eq(registeredUsers.email, email));
      if (checkUser.length > 0) {
        return NextResponse.json(
          { error: "Email already exists", status: 409 },
          { status: 409 }
        );
      } else {
        const user = await db.insert(registeredUsers).values({
          fullName: name,
          email: email,
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        const newUser = {
          fullName: name,
          email: email,
        };

        const token = jwt.sign({ user: newUser }, process.env.JWT_SECRET!, {
          expiresIn: "3d",
        });

        cookie.set("__serviceToken__", token);
        return NextResponse.json(
          {
            message: "User registered successfully!",
            user: newUser,
            status: 201,
          },
          { status: 201 }
        );
      }
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message, status: 500 },
        { status: 500 }
      );
    }
  } else {
    try {
      const checkUser = await db
        .select()
        .from(registeredUsers)
        .where(eq(registeredUsers.email, email));
      if (checkUser.length > 0) {
        const isMatch = await bcrypt.compare(password, checkUser[0].password);
        if (!isMatch) {
          return NextResponse.json(
            { error: "Invalid login credentials", status: 401 },
            { status: 401 }
          );
        }
        const newUser = {
          email: checkUser[0].email,
          fullName: checkUser[0].fullName,
        };
        const token = jwt.sign({ user: newUser }, process.env.JWT_SECRET!, {
          expiresIn: "3d",
        });
        cookie.set("__serviceToken__", token);
        return NextResponse.json(
          {
            message: "User logged in successfully!",
            user: newUser,
            status: 200,
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { error: "User not found!", status: 404 },
          { status: 404 }
        );
      }
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message, status: 500 },
        { status: 500 }
      );
    }
  }
}

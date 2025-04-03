import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req) {
  try {
    const { phone, password } = await req.json();
    const [rows] = await db.query(
      "SELECT * FROM users WHERE phone_number = ? AND password = ?",
      [phone, password]
    );
    if (rows.length > 0) {
      return NextResponse.json({ message: "Login successful", user: rows[0] });
    } else {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

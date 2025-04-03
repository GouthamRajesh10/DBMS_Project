import { NextResponse } from "next/server";
import db from "@/lib/db";
export async function GET(req) {
  try {
    console.log("Fetching tickets...");
    const { searchParams } = new URL(req.url);
    const movie = searchParams.get("movie");
    const showTime = searchParams.get("showTime");
    if (!movie || !showTime) {
      return NextResponse.json(
        { message: "Movie and showtime are required" },
        { status: 400 }
      );
    }
    const [rows] = await db.query(
      "SELECT * FROM movies WHERE name = ? AND show_time = ?",
      [movie, showTime]
    );
    if (rows.length > 0) {
      return NextResponse.json({
        success: true,
        tickets: rows[0].tickets_available,
      });
    } else {
      return NextResponse.json({ success: false, message: "No data found" });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

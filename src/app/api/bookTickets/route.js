import { NextResponse } from "next/server";
import db from "@/lib/db"; // Adjust the import based on your project structure

export async function POST(req) {
  try {
    const { movie, showTime, ticketsToBook } = await req.json();

    if (!movie || !showTime || !ticketsToBook || ticketsToBook <= 0) {
      return NextResponse.json(
        { success: false, message: "Invalid request" },
        { status: 400 }
      );
    }

    // Fetch current ticket availability
    const [rows] = await db.query(
      "SELECT tickets_available FROM movies WHERE name = ? AND show_time = ?",
      [movie, showTime]
    );

    if (rows.length === 0) {
      return NextResponse.json({
        success: false,
        message: "Movie or Showtime not found",
      });
    }

    const availableTickets = rows[0].tickets_available;

    if (availableTickets < ticketsToBook) {
      return NextResponse.json({
        success: false,
        message: "Not enough tickets available",
      });
    }

    // Update the database by reducing the number of available tickets
    await db.query(
      "UPDATE movies SET tickets_available = tickets_available - ? WHERE name = ? AND show_time = ?",
      [ticketsToBook, movie, showTime]
    );

    return NextResponse.json({
      success: true,
      message: "Booking successful",
      remainingTickets: availableTickets - ticketsToBook,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

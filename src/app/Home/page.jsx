"use client";
import { useState } from "react";
import MovieSlider from "@/src/componants/movieSlider";

export default function Home() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableTickets, setAvailableTickets] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ticketCount, setTicketCount] = useState(1);

  const fetchTickets = async (movie, time) => {
    setLoading(true);
    setError("");
    setAvailableTickets(null);

    try {
      const res = await fetch(`/api/tickets?movie=${movie}&showTime=${time}`);
      const data = await res.json();

      if (res.ok) {
        console.log("Response received:", data);
        setAvailableTickets(data.tickets);
      } else {
        setError(data.message || "Failed to fetch tickets.");
      }
    } catch (err) {
      setError("An error occurred while fetching tickets.");
    } finally {
      setLoading(false);
    }
  };

  const handleShowtimeClick = (movie, time) => {
    setSelectedMovie(movie);
    setSelectedTime(time);
    fetchTickets(movie, time);
  };

  const handleBooking = async () => {
    if (!selectedMovie || !selectedTime || ticketCount < 1) {
      setError("Please select a movie, time, and at least one ticket.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/bookTickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          movie: selectedMovie,
          showTime: selectedTime,
          ticketsToBook: ticketCount,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        console.log(data);
        setAvailableTickets((prev) => prev - ticketCount);
        alert("Booking successful!");
      } else {
        setError(data.message || "Failed to book tickets.");
      }
    } catch (err) {
      setError("An error occurred while booking tickets.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-blue-500 p-3 flex justify-center items-center text-white font-bold text-2xl h-20 shadow-md">
        WELCOME TO: ourMovies CINEMAS A/C 4K DOLBY ATMOS!! HAVE A JOYFUL
        EXPERIENCE
      </div>
      <div className="flex flex-row justify-start bg-gray-100 min-h-screen p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <MovieSlider
            onShowtimeClick={handleShowtimeClick}
            availableTickets={availableTickets}
          />
        </div>
        <div className="ml-10 flex flex-col gap-6 w-full">
          <h2 className="text-black font-semibold text-3xl">
            Available Tickets:{" "}
            {availableTickets !== null ? availableTickets : "N/A"}
          </h2>
          <div className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md w-80">
            {loading ? (
              <p className="text-blue-500">Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : null}
            <label className="text-black text-xl font-semibold flex flex-row items-center gap-4">
              Select Your Tickets:
              <input
                type="number"
                min="1"
                value={ticketCount}
                onChange={(e) => setTicketCount(parseInt(e.target.value) || 1)}
                className="border border-gray-400 rounded-lg p-2 w-24 text-black text-xl focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </label>
            <button
              onClick={handleBooking}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105 transition-transform duration-300"
            >
              Confirm Booking
            </button>
          </div>
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md w-80">
            <h3 className="text-black font-semibold text-2xl mb-4">
              Movie Reviews:
            </h3>
            <div className="border-b border-gray-300 pb-3 mb-3">
              <p className="text-gray-800">
                <strong>Gopu:</strong> "Amazing cinematography and great
                performances. A must-watch!"
              </p>
              <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
            </div>
            <div className="border-b border-gray-300 pb-3 mb-3">
              <p className="text-gray-800">
                <strong>Goutham Rajesh:</strong> "Loved the storyline and the
                sound quality was top-notch."
              </p>
              <span className="text-yellow-500">⭐⭐⭐⭐</span>
            </div>
            <div className="pt-3">
              <input
                type="text"
                placeholder="Write your review..."
                className="border border-gray-400 rounded-lg p-2 w-full text-black focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                Submit Review
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-blue-500 p-3 flex justify-center items-center text-white font-bold text-2xl h-20 shadow-md">
        ENJOY YOUR MOVIE WITH US!!
      </div>
    </div>
  );
}

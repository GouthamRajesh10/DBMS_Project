"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const movies = [
  {
    id: 1,
    title: "Once Upon a Time in Hollywood",
    image: "/ouatih.jpg",
    times: ["11:00", "2:15", "5:30", "8:45"],
    description:
      "A faded television actor and his stunt double strive to achieve fame and success in the film industry during the final years of Hollywood's Golden Age in 1969 Los Angeles.",
    rating: 7.6,
    genre: "Drama, Comedy, Action",
    director: "Quentin Tarantino",
    cast: "Leonardo DiCaprio, Brad Pitt, Margot Robbie",
  },
  {
    id: 2,
    title: "Eternal Sunshine of the Spotless Mind",
    image: "/esotsm.jpg",
    times: ["11:00", "2:15", "5:30", "8:45"],
    description:
      "When their relationship turns sour, a couple undergoes a medical procedure to have each other erased from their memories. But it is only through the process of loss that they discover what they had to begin with.",
    rating: 8.3,
    genre: "Drama, Romance, Sci-Fi",
    director: "Michel Gondry",
    cast: "Jim Carrey, Kate Winslet, Kirsten Dunst",
  },
  {
    id: 3,
    title: "Scarface",
    image: "/scarface.jpeg",
    times: ["11:00", "2:15", "5:30", "8:45"],
    description:
      "A Cuban immigrant rises to power in Miami's drug underworld, driven by ambition and ruthless determination. But as his empire grows, betrayal, violence, and paranoia threaten to bring everything crashing down.",
    rating: 8.3,
    genre: "Crime, Drama, Action",
    director: "Brian De Palma",
    cast: "Al Pacino, Michelle Pfeiffer, Steven Bauer",
  },
];

export default function MovieSlider({ onShowtimeClick }) {
  return (
    <div className="flex h-screen justify-start">
      <div className="w-2/3 ml-0 mb-4 left-0">
        <h1 className="text-3xl font-bold text-left text-gray-800 mb-4">
          Now Showing
        </h1>
        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          className="w-full max-w-lg pb-10 p-3"
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <div className="bg-gray-900 text-white p-5 rounded-lg shadow-lg h-auto mb-5">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-1/2 h-1/2 object-cover rounded-lg mb-4 mx-auto"
                />
                <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
                <p className="text-gray-400 mb-2">{movie.description}</p>
                <p className="text-gray-400 mb-2">Rating: {movie.rating}</p>
                <p className="text-gray-400 mb-2">Genre: {movie.genre}</p>
                <p className="text-gray-400 mb-2">Director: {movie.director}</p>
                <p className="text-gray-400 mb-2">Cast: {movie.cast}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {movie.times.map((time, idx) => (
                    <button
                      key={idx}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                      onClick={() => onShowtimeClick(movie.title, time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

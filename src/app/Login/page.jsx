"use client";
import { useState } from "react";
import { FaFacebookF, FaGoogle, FaPhoneAlt, FaLock } from "react-icons/fa";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSignIn = async () => {
    setError(""); // Reset error message

    console.log("Attempting login...");
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, password }),
      });

      console.log("Response:", res);

      const data = await res.json();
      console.log("Response Data:", data);

      if (res.status === 401) {
        setError(
          "Invalid credentials. Please check your phone number and password."
        );
        return;
      }

      if (res.ok) {
        console.log("Login successful:", data);
        router.push("/Home"); // Redirect to home page
      } else {
        setError(data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center h-full">
        <div className="bg-white rounded-2xl shadow-3xl flex w-2/3 max-w-4xl">
          <div className="w-3/5 p-5">
            <div className="text-left font-bold ml-3">
              <span className="text-blue-400">
                our<span className="text-black">Movies</span>
              </span>
            </div>
            <div className="py-10">
              <h2 className="text-3xl font-bold text-blue-400">
                Sign in to your Account
              </h2>
              <div className="border-2 w-10 border-blue-400 inline-block mb-2"></div>
              <div className="flex justify-center my-2">
                <a
                  href="#"
                  className="border-2 border-gray-300 rounded-full p-3 mx-2 hover:bg-blue-400 hover:text-white transition duration-300 shadow-2xl"
                >
                  <FaFacebookF className="text-sm text-gray-400 "></FaFacebookF>
                </a>
                <a
                  href="#"
                  className="border-2 border-gray-300 rounded-full p-3 mx-2 hover:bg-red-300 hover:text-white transition duration-300 shadow-2xl"
                >
                  <FaGoogle className="text-sm text-gray-400"></FaGoogle>
                </a>
              </div>
              <p className="text-gray-400 my-3">or use your phone number</p>
              <div className="flex flex-col items-center">
                <div className="bg-gray-100 w-80 p-2 flex items-center rounded-xl mt-2">
                  <FaPhoneAlt className="text-gray-300 mt-2 ml-2" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your Number"
                    className="bg-gray-100 outline-none text-sm flex-1 text-gray-500 ml-2 py-1 mt-1"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="bg-gray-100 w-80 p-2 flex items-center rounded-xl mt-4 mb-1 ">
                  <FaLock className="text-gray-300 mt-2 ml-2" />
                  <input
                    type="password"
                    name="Password"
                    placeholder="Password"
                    className="bg-gray-100 outline-none text-sm flex-1 text-gray-500 ml-2 py-1 mt-1"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex w-76 mb-5 mt-2">
                  <label className="flex items-center text-xs text-gray-500">
                    <input type="checkbox" name="remember" className="mr-2" />
                    Remember me
                  </label>
                  <a href="#" className="text-xs text-blue-400 ml-auto">
                    Forgot Password?
                  </a>
                </div>
                <button
                  onClick={handleSignIn}
                  className="bg-blue-400 w-60 p-2 rounded-xl text-white font-semibold mb-2 hover:bg-blue-500 transition duration-300 shadow-2xl"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
          <div className="w-2/5 bg-blue-300 text-blue-950 p-5 rounded-tr-2xl rounded-br-2xl flex items-center justify-center relative">
            <h2 className="text-.5xl font-semibold mb-2">
              "Discover a world of cinematic wonders with ourMovies! Whether
              you're a fan of heart-pounding thrillers, heartwarming dramas, or
              action-packed adventures, we've got something for everyone. Stay
              updated with the latest releases, explore timeless classics, and
              dive into a community of movie lovers just like you. Sit back,
              relax, and let the magic of cinema take you on an unforgettable
              journey!"
            </h2>
          </div>
        </div>
      </main>
    </div>
  );
}

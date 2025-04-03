import { Poppins } from "next/font/google";
import "./globals.css"; // Ensure global styles are imported

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"], // Select the font weights you need
  style: ["normal", "italic"], // Include styles if needed
  display: "swap", // Improves font rendering
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}

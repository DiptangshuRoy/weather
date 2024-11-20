import { Agdasima, Lacquer, Rubik_Mono_One, Mystery_Quest, Peralta, Galindo } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import MyName from "./MyName";
import Github from "./Github";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const agdasima = Agdasima({ subsets: ["latin"], weight: ["400", "700"] });
const lacquer = Lacquer({ subsets: ["latin"], weight: ["400"] });
const rubikMonoOne  = Rubik_Mono_One({ subsets: ["latin"], weight: ["400"], style: ["normal"] });
const mysteryQuest = Mystery_Quest({ subsets: ["latin"], weight: ["400"] });
const peralta = Peralta({ subsets: ["latin"], weight: ["400"] });
const galindo = Galindo({ subsets: ["latin"], weight: ["400"] });

export const metadata = {
  title: "Weather",
  description: "Get weather information for a specific weather station.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${galindo.className} ${rubikMonoOne.className} ${lacquer.className} ${geistSans.variable} ${geistMono.variable} ${agdasima.className} antialiased h-screen bg-no-repeat`}
      >
        <div className="absolute inset-0 bg-[url('../public/Background9.jpg')] bg-cover bg-center blur-[4px] bg-no-repeat max-md:bg-repeat-y z-0"></div>
        <Github />
        <div className="relative z-10">{children}</div>
        <MyName />
      </body>
    </html>
  );
}

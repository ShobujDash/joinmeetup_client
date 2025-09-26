import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"], // যেসব ওজন লাগবে শুধু সেগুলো রাখুন
  variable: "--font-roboto",
});

export const metadata = {
  title: "JoinMeetUpBD",
  description: "Joinmeetupbd home page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.className}>
      <body className={` antialiased`} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}

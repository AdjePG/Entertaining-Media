import { poppins } from '@/utils/fonts';
import "./globals.css";
import Header from "@/components/header/header";

export default function RootLayout(
  {children}: Readonly<{children: React.ReactNode;}>
) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        <Header />
        {children}
      </body>
    </html>
  );
}

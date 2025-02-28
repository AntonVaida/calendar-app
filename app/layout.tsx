
import type { Metadata } from "next";
import { Roboto } from 'next/font/google';
import { Providers } from './hok/Providers';
import './styles/globals.css'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: "Calendar",
  description: "Calendar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}


import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Attitude Rewind',
  description: 'A chronological tour of WWF events in the years 2000 and 2001.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="https://i.imgur.com/ITpm1XW.png" type="image/png" />
        <link rel="apple-touch-icon" href="https://i.imgur.com/ITpm1XW.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased bg-background flex flex-col min-h-screen">
        <div className="flex-grow">
          {children}
        </div>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}

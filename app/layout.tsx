import { GeistSans } from "geist/font/sans";
import Providers from '@/shared/providers';
import "./globals.css";
import Header from "@/components/Header";
import { cookies } from "next/headers";
import { getTheme } from "@/shared/themes/server";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const themeMode = getTheme(cookies());
  
  return (
    <html lang="en" className={GeistSans.className + ' ' + themeMode}>
      <body className="bg-background text-foreground">
        <main className="min-h-dvh flex flex-col items-center justify-between">
          <Header />
          <Providers>
            {children}
          </Providers>
          <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
            <p>
              Powered by{" "}
              <a
                href="https://vk.com/jarponok"
                target="_blank"
                className="font-bold hover:underline text-secondary-500"
                rel="noreferrer"
              >
                trueHack
              </a>
            </p>
          </footer>
        </main>
      </body>
    </html>
  );
}

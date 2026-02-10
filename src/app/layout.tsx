import type { Metadata } from "next";
import { Playfair_Display, Poppins, Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lea Maliar | Business Developer & E-commerce Manager",
  description:
    "Portfolio de Lea Maliar - Business Developer & E-commerce Manager specialisee en Beauty Tech et strategie e-commerce.",
  keywords: [
    "Lea Maliar",
    "Business Developer",
    "E-commerce",
    "Beauty Tech",
    "Cosmetiques",
    "Digital Marketing",
  ],
  openGraph: {
    title: "Lea Maliar | Business Developer & E-commerce Manager",
    description: "Transforming Beauty Brands Through Strategic Innovation",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${poppins.variable} ${inter.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

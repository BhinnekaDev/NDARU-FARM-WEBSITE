import "./globals.css";
import { PathProvider } from "@/components/PathContext";
import Head from "next/head";

export const metadata = {
  title: "E-Mart Ndaru Farm",
  description: "Created by BhinekaDeveloper",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <body>
        <PathProvider>{children}</PathProvider>
      </body>
    </html>
  );
}

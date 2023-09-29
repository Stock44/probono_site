import "./globals.css";
import React from "react";
import { type Metadata } from "next";
import ClientProviders from "@/components/ClientProviders";

export const metadata: Metadata = {
  title: "probono",
  description: "probono",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-stone-950">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}

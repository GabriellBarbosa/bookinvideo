"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import ReactQueryProvider from "@/providers/react-query-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <ReactQueryProvider>
        <SessionProvider>{children}</SessionProvider>
      </ReactQueryProvider>
    </ThemeProvider>
  );
}

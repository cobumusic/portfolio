"use client";
import "@/styles/core.scss";
import { usePathname, useSearchParams } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/va9B4kDNxMZdWfMOD5VnSKzeRhf6.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="true"
        />
        <link
          rel="preload"
          href="/fonts/va9B4kDNxMZdWfMOD5VnWKneRhf6.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="true"
        />
        <link
          rel="preload"
          href="/fonts/va9C4kDNxMZdWfMOD5VvkrjJYTI.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="true"
        />
        <link
          rel="preload"
          href="/fonts/va9E4kDNxMZdWfMOD5Vvl4jL.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="true"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0"
        />
      </head>
      <body>
        <div className="invisible"></div>
        {children}
      </body>
    </html>
  );
}

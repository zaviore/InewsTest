"use client";
import "./globals.css";
import React, { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/config/theme";
import { usePathname } from "next/navigation";
import { client } from "@/config/api";
import { Update_view, query_count_view, meta_query } from "@/app/query";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import NavbarComponent from "@/component/navbar";

export function ThemeRegistry(props) {
  const { children } = props;

  const pathname = usePathname();
  const slug = pathname.split("/");
  const queryClient = new QueryClient();

  const updatePageView = async () => {
    const { post } = await client.request(query_count_view, { slug: slug[2] });
    client.request(Update_view, { slug: slug[2], viewCount: post.view + 1 });
  };

  useEffect(() => {
    if (slug[2]) {
      updatePageView();
    }
  }, [pathname]);

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />

        {children}
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default function RootLayout(props) {
  const { children } = props;
  const pathname = usePathname();
  const slug = pathname.split("/");
  let metadata = {
    title: "Default Metadata",
    description: "testing create blog inews seo inews meta description",
  };
  if (slug[2]) {
    metadata = {
      title: `Metadata-${slug[2]}`,
      description: `testing create blog inews seo inews meta ${slug[2]}`,
    };
  }

  return (
    <html lang='en'>
      <head>
        <title>Home Page</title>
        <meta
          title={metadata.title}
          name={metadata.title}
          content={metadata.description}
        />
      </head>
      <body>
        <ThemeRegistry options={{ key: "mui" }}>
          <NavbarComponent />
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}

"use client";
import "./globals.css";
import React, { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/config/theme";
import { usePathname } from "next/navigation";
import { client } from "@/config/api";
import { gql } from "graphql-request";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NavbarComponent from "@/component/navbar";

const Update_view = gql`
  mutation UpdatePost($slug: String, $viewCount: Int) {
    updatePost(where: { slug: $slug }, data: { view: $viewCount }) {
      id
    }
  }
`;

const query = gql`
  query MyQuery($slug: String!) {
    post(where: { slug: $slug }) {
      id
      view
    }
  }
`;

export function ThemeRegistry(props) {
  const { children } = props;

  const pathname = usePathname();
  const slug = pathname.split("/");
  const queryClient = new QueryClient();

  const updatePageView = async () => {
    if (slug[2]) {
      const { post } = await client.request(query, { slug: slug[2] });
      client.request(Update_view, { slug: slug[2], viewCount: post.view + 1 });
    }
  };

  useEffect(() => {
    updatePageView();
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
  const metadata = {
    title: "myblog",
    description: "testing create blog inews",
  };
  return (
    <html lang='en'>
      <head>
        <meta title={metadata.title} content={metadata.description} />
      </head>
      <body>
        <NavbarComponent />
        <ThemeRegistry options={{ key: "mui" }}>{children}</ThemeRegistry>
      </body>
    </html>
  );
}

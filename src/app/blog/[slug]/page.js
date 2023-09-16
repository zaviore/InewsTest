import { client } from "@/config/api";
import React from "react";
import Image from "next/image";
import { Box, Container, Typography } from "@mui/material";
import { queryStatic, query, crete_view } from "./query";
export const revalidate = 2;

export default async function Page({ params }) {
  const projects = await getPosts(params);

  return (
    <Container maxWidth='md'>
      <Typography variant='h3' align='center'>
        {projects.title}
      </Typography>
      <Box textAlign={"center"}>
        {" "}
        <Image
          src={projects.coverImage?.url}
          alt='thumbnail'
          width={400}
          height={300}
        />
      </Box>

      <Typography variant='caption' align='center'>
        {projects.content.text}
      </Typography>
    </Container>
  );
}
export async function generateStaticParams() {
  const data = await client.request(queryStatic);
  return data.posts.map((key) => key);
  //   return productIds.map((post) => ({ slug: post }));
}

async function getPosts({ slug }) {
  const res = await client.request(query, {
    slug,
  });

  return res.post;
}

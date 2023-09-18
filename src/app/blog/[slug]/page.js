import { client } from "@/config/api";
import React from "react";
import Image from "next/image";
import { Box, Container, Typography } from "@mui/material";
import { queryStatic, query_detail_post, Update_view } from "@/app/query";
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
          laz
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
  const variables = { slug };

  const res = await client.request(query_detail_post, variables);

  return res.post;
}

import { client } from "@/config/api";
import React from "react";
import Image from "next/image";
import { Box, Container, Typography } from "@mui/material";
import { queryStatic, query_detail_post, Update_view } from "@/app/query";
import moment from "moment/moment";
export const revalidate = 2;

export default async function Page({ params }) {
  const projects = await getPosts(params);

  return (
    <Container maxWidth='md'>
      <Box>
        <Typography variant='h3' align='center' textAlign={"left"}>
          {projects.title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", my: "10px" }}>
          <Image
            src={projects.author?.picture.url}
            alt='thumbnail'
            width={50}
            height={50}
            lazyBoundary
            style={{ borderRadius: "50px", marginRight: "10px" }}
          />
          <Box>
            <Typography variant='subtitle1' align='center' textAlign={"left"}>
              Oleh {projects.author.name}
            </Typography>
            <Typography variant='caption' align='center' textAlign={"left"}>
              {moment(projects.updatedAt).format("DD MMMM YYYY")}
            </Typography>
          </Box>
        </Box>

        <Box textAlign={"left"}>
          {" "}
          <Image
            src={projects.coverImage?.url}
            alt='thumbnail'
            width={800}
            height={500}
            lazyBoundary
            style={{ borderRadius: "10px" }}
          />
        </Box>

        <Typography variant='caption' align='center'>
          {projects.content.text.replace(/\\n/g, "\n")}
        </Typography>
      </Box>
    </Container>
  );
}

async function getPosts({ slug }) {
  const variables = { slug };

  const res = await client.request(query_detail_post, variables);

  return res.post;
}

"use client";
import React, { useState } from "react";
import Container from "@mui/material/Container";
// import NavbarComponent from "@/component/navbar";
import { client } from "@/config/api";
import { gql } from "graphql-request";
import { useQuery, useQueries } from "@tanstack/react-query";
import Image from "next/image";
import { Box, Button, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";

const Update_view = gql`
  mutation UpdatePost($slug: String, $viewCount: Int) {
    updatePost(where: { slug: $slug }, data: { view: $viewCount }) {
      id
    }
  }
`;

const query = gql`
  query Assets($search: String) {
    posts(where: { _search: $search }) {
      id
      slug
      title
      coverImage {
        altText
        url
      }
      stage
      excerpt
      view
    }
  }
`;

const top_query = gql`
  query MyQuery {
    posts(first: 5, orderBy: view_DESC) {
      id
      slug
      title
      coverImage {
        altText
        url
      }
    }
  }
`;

function page(props) {
  //   const queryss = gql`
  // query MyQuery {
  //     post(where: {slug: first-blog"}) {
  //       id
  //       title
  //       stage
  //       slug
  //       content {
  //         text
  //       }
  //     }
  //   }
  //   `;

  // const fess = async () => {
  //   const data = await client.request(queryss);
  //   console.log(data, "apa omo");
  // };

  // React.useEffect(() => {
  //   fess();
  // }, []);

  // client.request(crete_view, { slug: slug, jumlah: view + 1 });
  // return res;

  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const [postblog, topFive] = useQueries({
    queries: [
      {
        queryKey: ["posts_blog", { search }],
        queryFn: async () =>
          client
            .request(query, { search: search || "" })
            .then((res) => res)
            .catch((err) => console.log(err)),
      },
      {
        queryKey: ["top_five"],
        queryFn: async () =>
          client
            .request(top_query)
            .then((res) => res)
            .catch((err) => console.log(err)),
      },
    ],
  });

  return (
    <Container maxWidth={"xl"}>
      <Grid container>
        <Grid item xs={8}>
          <Box mt={2}>
            {!postblog.isLoading &&
              postblog.data.posts.map((key, idx) => (
                <ComponentPost data={key} key={idx} />
              ))}
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              margin: "15px",
              borderRadius: "10px",
            }}
          >
            <Typography variant='h6' fontWeight={"bold"}>
              {" "}
              Top 5 Article
            </Typography>
            <br></br>
            <hr />

            {!topFive.isLoading &&
              topFive.data.posts.map((key, idx) => (
                <TopViewPost data={key} key={idx} />
              ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default page;

const TopViewPost = ({ data }) => {
  const { id, title, excerpt, slug, coverImage } = data;

  return (
    <Box sx={{ borderRadius: "10px" }}>
      <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Box>
          <Image src={coverImage?.url} alt='thumbnail' width={50} height={50} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          my={2}
        >
          <Box>
            <Link
              href={`/blog/${slug}`}
              style={{ textDecoration: "none" }}
              passHref
            >
              <Typography
                fontWeight={"bold"}
                variant='inherit'
                color={"black"}
                maxWidth={200}
              >
                {title}
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const ComponentPost = ({ data }) => {
  const { id, title, excerpt, slug, coverImage } = data;
  // console.log(data, "yes");

  return (
    <Box
      sx={{ backgroundColor: "#e3e3e3", margin: "15px", borderRadius: "10px" }}
    >
      <Box sx={{ display: "flex", gap: "20px" }}>
        <Box>
          <Image
            src={coverImage?.url}
            alt='thumbnail'
            width={200}
            height={200}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          my={2}
        >
          <Box>
            <Typography sx={{ fontSize: "25px", fontWeight: "bold" }}>
              {title}
            </Typography>
            <Box maxWidth={600}>{excerpt}</Box>
          </Box>

          <Link href={`/blog/${slug}`} passHref>
            <Button variant='contained'>Read More</Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

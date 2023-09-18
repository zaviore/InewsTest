"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Box, Button, Grid, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import moment from "moment/moment";
function SearchBarFallback() {
  return <>placeholder</>;
}
function content(props) {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  //   console.log(props.data);
  const { postblog } = props.data;
  return (
    <Box mt={2}>
      <Typography variant='h4' fontWeight='bold'>
        Blog Terbaru
      </Typography>
      <hr />
      {postblog.posts.map((key, idx) => {
        const keys = key.title.toLowerCase();
        if (search) {
          if (keys.includes(search.toLowerCase()))
            return <ComponentPost data={key} key={idx} />;
        } else {
          return <ComponentPost data={key} key={idx} />;
        }
      })}
    </Box>
  );
}

export default content;

const ComponentPost = ({ data }) => {
  const { title, excerpt, slug, coverImage, author, updatedAt } = data;
  console.log(data, "ini");
  return (
    <Box sx={{ margin: "15px", borderRadius: "10px" }}>
      <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Box>
          <Image
            src={coverImage?.url}
            alt='thumbnail'
            width={200}
            height={200}
            style={{ borderRadius: "15px" }}
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
          <Box py={2}>
            <Link
              href={`/blog/${slug}`}
              style={{ textDecoration: "none", color: "black" }}
              passHref
            >
              <Typography sx={{ fontSize: "25px", fontWeight: "bold" }}>
                {title}
              </Typography>
            </Link>
            <Box maxWidth={600}>{excerpt}</Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box mr={1}>
              <Image
                src={author?.picture.url}
                alt='thumbnail'
                width={20}
                height={20}
                style={{ borderRadius: "15px" }}
              />
            </Box>
            <Box>
              <Typography variant='contained'>{author.name}</Typography> |
            </Box>
            <Box mx={1}>
              <Typography color={"red"}>
                {moment(updatedAt).format("DD MMMM YYYY")}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

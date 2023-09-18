"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Box, Button, Grid, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/config/api";
import { query_post } from "../query";
export default function SearchBar() {
  const searchParams = useSearchParams();

  const search = searchParams.get("search");

  const { data, isLoading } = useQuery({
    queryKey: ["search", { search }],
    queryFn: async () => {
      const res = client.request(query_post, { search: search || "" });
      return res;
    },
  });

  // This will not be logged on the server when using static rendering
  console.log(data);
  if (!data) return <p>loading</p>;
  return (
    <Box mt={2}>
      <Typography variant='h4' fontWeight='bold'>
        Blog Terbaru
      </Typography>
      <hr />
      {data.posts.map((key, idx) => (
        <ComponentPost data={key} key={idx} />
      ))}
    </Box>
  );
}

const ComponentPost = ({ data }) => {
  const { title, excerpt, slug, coverImage, author } = data;

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
              <Typography variant='contained'>{author.name}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

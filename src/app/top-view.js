import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

function TopView(props) {
  const { topFive } = props.data;
  return (
    <Box
      sx={{
        margin: "25px",
        borderRadius: "10px",
      }}
    >
      <Typography variant='h6' fontWeight='bold'>
        Top 5 Article
      </Typography>
      <hr />
      <Box mt={2}>
        {topFive.posts.map((key, idx) => (
          <TopViewPost data={key} key={idx} />
        ))}
      </Box>
    </Box>
  );
}

export default TopView;

const TopViewPost = ({ data }) => {
  const { title, slug, coverImage } = data;

  return (
    <Box sx={{ borderRadius: "10px" }}>
      <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Box>
          <Image src={coverImage?.url} alt='thumbnail' width={50} height={50} />
        </Box>
        <Box my={2}>
          <Box>
            <Link
              href={`/blog/${slug}`}
              style={{ textDecoration: "none" }}
              passHref
            >
              <Typography
                fontWeight='bold'
                variant='inherit'
                color='black'
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

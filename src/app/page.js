import React from "react";
import Container from "@mui/material/Container";
import { client } from "@/config/api";
import { Grid } from "@mui/material";

import { query_post, top_query, queryStatic } from "./query";
// export const dynamic = "force-dynamic";
import Content from "./content";
import TopView from "./top-view";

export default async function Page({ searchParams }) {
  // console.log(searchParams);
  const { props } = await getAPIData(searchParams);

  return (
    <Container maxWidth={"xl"}>
      <Grid container>
        <Grid item xs={8}>
          <Content data={props} />
        </Grid>

        <Grid item xs={4}>
          <TopView data={props} />
        </Grid>
      </Grid>
    </Container>
  );
}

export async function generateStaticParams() {
  const data = await client.request(queryStatic);
  return data.posts.map((key) => key);
  //   return productIds.map((post) => ({ slug: post }));
}

async function getAPIData({ params }) {
  const searchParams = params || "";
  const [postblog, topFive] = await Promise.all([
    client.request(query_post, { search: searchParams || "" }),
    client.request(top_query),
  ]);

  return { props: { postblog, topFive } };
}

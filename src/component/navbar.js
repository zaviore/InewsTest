"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Box, Input } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";

import { useRouter } from "next/navigation";
function NavbarComponent(props) {
  const router = useRouter();
  const pathname = usePathname();
  const blog = pathname.includes("/blog");

  console.log(blog, pathname);
  const [search, setSearch] = React.useState("");

  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmitSearch = (event) => {
    if (event.key === "Enter") {
      //   params.set();
      router.push(`?search=${search}`);
    }
  };

  const css = {
    appBars: {
      backgroundColor: "#e11d48",
      boxShadow: "none",
    },
  };

  return (
    <AppBar position='static' sx={css.appBars}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "white",
              textDecoration: "none",
            }}
          >
            Myblog
          </Typography>
          {!blog && (
            <Box sx={{ backgroundColor: "white" }}>
              {" "}
              <input
                style={{ padding: 5, outline: "none", border: "none" }}
                value={search}
                name='search'
                onKeyDown={handleSubmitSearch}
                onChange={handleChangeSearch}
              />
              <IconButton
                type='button'
                sx={{ p: "5px" }}
                aria-label='search'
                onClick={handleSubmitSearch}
              >
                <SearchIcon />
              </IconButton>
            </Box>
          )}

          <Typography
            variant='h5'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "black",
              textDecoration: "none",
            }}
          >
            Myblog
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavbarComponent;

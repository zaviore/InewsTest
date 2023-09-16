import { GraphQLClient } from "graphql-request";

const BASE_URL =
  "https://api-ap-northeast-1.hygraph.com/v2/clmkt6a8v12s301um7w32cwjz/master";
const graphcmsToken =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2OTQ4OTkyMzcsImF1ZCI6WyJodHRwczovL2FwaS1hcC1ub3J0aGVhc3QtMS5oeWdyYXBoLmNvbS92Mi9jbG1rdDZhOHYxMnMzMDF1bTd3MzJjd2p6L21hc3RlciIsIm1hbmFnZW1lbnQtbmV4dC5ncmFwaGNtcy5jb20iXSwiaXNzIjoiaHR0cHM6Ly9tYW5hZ2VtZW50LmdyYXBoY21zLmNvbS8iLCJzdWIiOiI2MzEzNDk5My0xOTY4LTRkNmQtYjgyYS02Y2NmNWJhZTcyNjMiLCJqdGkiOiJjbG1tajh0ZWcxdDVhMDF1bTQydzhhazRlIn0.sTLoZhaVocfJQxE7Z8aNmUzyVMSqRUwjPVqXhD_KcWsz6pI6driaaUYkEcNuLX6WCDZtii_S-70hQNey2QWqq1ajdclpX641W37WbWgVtjcjQkgRPOI5F1ZvKs_DE2MzCoHG7z7XsmWLuMimfKwOdNSx-F1GtqjmMPZdDHygy2opRvbmJfbmtrhm26FjvvoxZC7UQoFTjM90CJ1YOQ2cEzhG8mLAWXr8K73ne6Cpf6AAch9jUOztyyeSU9-FMA7FNysoX-cFv2XjmX8Rr7af1lYZzrB4HfC71jJHU1A-lvt2ZtOcBH-amwDJ8RovXKYGEOAPUXoKMNR71XOspJhKUR8g61fs1WRkkaUrqxX8jpX8REOMcHlxSLaf-3LL-HryEd0gm13P3Ype6xpwgBCzw80AYQ74IBiNk28mN3fihwZsCpje8EeZ-FMw5ASM3mePN2r03Y1V8CKchhXHbIXKq5LWLI_4gVX1hCeN6QIycpFIiQj0IYoFJAlNjGeVyw4L5-f42Us3Oi_STvRQKbhxGj1X6uUCfgzBFJYg-dlel4ETF6_LiJw1oQHe6oGsH6IciTNVaxy72H5yE1mYVumW7HGygZlshQ-RVYUQOjP6TG2kzoI0fcDNUMcWrB4zqMkkPlBU-ARVbgLP6wrHK3vlE70zAgVU7eJ13QKuh8g0VoE";
export const client = new GraphQLClient(BASE_URL, {
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${graphcmsToken}`,
  },
});

export const submitCounter = async (obj) => {
  const result = await fetch("/api/route", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};

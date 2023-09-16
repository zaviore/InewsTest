import { gql } from "graphql-request";
export const query = gql`
  query MyQuery($slug: String!) {
    post(where: { slug: $slug }) {
      id
      title
      stage
      slug
      coverImage {
        altText
        url
      }
      content {
        text
      }
    }
  }
`;

export const queryStatic = gql`
  query Assets {
    posts {
      id
      slug
    }
  }
`;
export const crete_view = gql`
  mutation {
    updateProduct(where: { slug: "$slug" }, data: { view: $jumlah }) {
      id
      name
      slug
      price
    }
  }
`;

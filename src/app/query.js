import { gql } from "graphql-request";
export const query_post = gql`
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
      updatedAt
      author {
        id
        name
        picture {
          url
        }
      }
    }
  }
`;

export const meta_query = gql`
  query MyQuery($slug: String) {
    posts(where: { slug: $slug }) {
      seoOverride {
        title
        description
      }
    }
  }
`;
export const top_query = gql`
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

export const query_detail_post = gql`
  query MyQuery($slug: String!) {
    post(where: { slug: $slug }) {
      id
      title
      stage
      slug
      view
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

export const query_count_view = gql`
  query MyQuery($slug: String!) {
    post(where: { slug: $slug }) {
      id
      view
    }
  }
`;
export const Update_view = gql`
  mutation UpdatePost($slug: String, $viewCount: Int) {
    updatePost(where: { slug: $slug }, data: { view: $viewCount }) {
      id
    }
  }
`;

const blogFragment = /* GraphQL */ `
  fragment blog on Blog {
    id
    title
    handle
    seo {
      title
      description
    }
    articles(first: 100) {
      edges {
        node {
          id
          title
          handle
          excerpt
          publishedAt
          seo {
            title
            description
          }
        }
      }
    }
  }
`;

export const getBlogQuery = /* GraphQL */ `
  query getBlog($handle: String!) {
    blogByHandle(handle: $handle) {
      ...blog
    }
  }
  ${blogFragment}
`;

export const getBlogsQuery = /* GraphQL */ `
  query getBlogs {
    blogs(first: 100) {
      edges {
        node {
          ...blog
        }
      }
    }
  }
  ${blogFragment}
`;

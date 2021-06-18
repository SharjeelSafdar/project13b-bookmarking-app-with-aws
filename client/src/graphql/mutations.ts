/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBookmark = /* GraphQL */ `
  mutation CreateBookmark($title: String!, $url: String!) {
    createBookmark(title: $title, url: $url) {
      id
      title
      url
    }
  }
`;
export const editBookmark = /* GraphQL */ `
  mutation EditBookmark($id: ID!, $title: String!, $url: String!) {
    editBookmark(id: $id, title: $title, url: $url) {
      id
      title
      url
    }
  }
`;
export const deleteBookmark = /* GraphQL */ `
  mutation DeleteBookmark($id: ID!) {
    deleteBookmark(id: $id) {
      id
      title
      url
    }
  }
`;

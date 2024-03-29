/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type Bookmark = {
  __typename: "Bookmark",
  id: string,
  title: string,
  url: string,
};

export type DeletedBookmark = {
  __typename: "DeletedBookmark",
  id: string,
};

export type CreateBookmarkMutationVariables = {
  title: string,
  url: string,
};

export type CreateBookmarkMutation = {
  createBookmark:  {
    __typename: "Bookmark",
    id: string,
    title: string,
    url: string,
  },
};

export type EditBookmarkMutationVariables = {
  id: string,
  title: string,
  url: string,
};

export type EditBookmarkMutation = {
  editBookmark:  {
    __typename: "Bookmark",
    id: string,
    title: string,
    url: string,
  },
};

export type DeleteBookmarkMutationVariables = {
  id: string,
};

export type DeleteBookmarkMutation = {
  deleteBookmark:  {
    __typename: "Bookmark",
    id: string,
    title: string,
    url: string,
  },
};

export type BatchDeleteBookmarksMutationVariables = {
  ids: Array< string >,
};

export type BatchDeleteBookmarksMutation = {
  batchDeleteBookmarks:  Array< {
    __typename: "DeletedBookmark",
    id: string,
  } | null >,
};

export type BookmarksQuery = {
  bookmarks:  Array< {
    __typename: "Bookmark",
    id: string,
    title: string,
    url: string,
  } >,
};

export type OnCreateBookmarkSubscription = {
  onCreateBookmark?:  {
    __typename: "Bookmark",
    id: string,
    title: string,
    url: string,
  } | null,
};

export type OnEditBookmarkSubscription = {
  onEditBookmark?:  {
    __typename: "Bookmark",
    id: string,
    title: string,
    url: string,
  } | null,
};

export type OnDeleteBookmarkSubscription = {
  onDeleteBookmark?:  {
    __typename: "Bookmark",
    id: string,
    title: string,
    url: string,
  } | null,
};

export type OnBatchDeleteBookmarksSubscription = {
  onBatchDeleteBookmarks?:  Array< {
    __typename: "DeletedBookmark",
    id: string,
  } | null > | null,
};

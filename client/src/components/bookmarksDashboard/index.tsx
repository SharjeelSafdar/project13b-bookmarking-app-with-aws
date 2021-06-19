import React, { FC } from "react";
import { Container, Box } from "@material-ui/core";

import NewBookmark from "../newBookmark";
import BookmarkItem from "../bookmarkItem";
import { useAppContext } from "../../context/appContext";

const BookmarksDashboard: FC = () => {
  const { bookmarks, isFetchingBookmarks } = useAppContext();

  return (
    <Container maxWidth="sm">
      {isFetchingBookmarks && <p>Loading...</p>}
      {!isFetchingBookmarks && bookmarks && (
        <>
          <NewBookmark />
          <Box marginTop={3}>
            {bookmarks.length === 0 ? (
              <p>
                There are no bookmarks saved; press the add button to save one.
              </p>
            ) : (
              bookmarks.map(bookmark => (
                <BookmarkItem key={bookmark.id} bookmark={bookmark} />
              ))
            )}
          </Box>
        </>
      )}
    </Container>
  );
};

export default BookmarksDashboard;

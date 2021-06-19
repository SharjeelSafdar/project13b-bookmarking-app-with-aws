import React, { FC, useState } from "react";
import { Button, Grid } from "@material-ui/core";
import { FaPlus } from "react-icons/fa";
import { AiTwotoneDelete } from "react-icons/ai";
import { GiConfirmed, GiCancel } from "react-icons/gi";

import BookmarkModal from "../bookmarkModal";
import { useAppContext } from "../../context/appContext";

const NewBookmark: FC = () => {
  const {
    isSelectionMode,
    startSelectionMode,
    finishSelectionMode,
    batchDeleteBookmarksById,
    isBusy,
  } = useAppContext();
  const [showNewBookmarkModal, setShowNewBookmarkModal] = useState(false);

  return (
    <Grid container spacing={1} justify="space-around">
      <Grid item sm={6}>
        <Button
          onClick={() => setShowNewBookmarkModal(true)}
          disabled={isSelectionMode || isBusy}
          title="Add new bookmark"
          color="primary"
          startIcon={<FaPlus size="1rem" />}
          variant="contained"
          fullWidth
          aria-label="add"
        >
          New Bookmark
        </Button>
        <BookmarkModal
          modalType="New"
          modalStatus={showNewBookmarkModal}
          closeModal={() => setShowNewBookmarkModal(false)}
        />
      </Grid>
      <Grid item sm={6}>
        <Button
          onClick={startSelectionMode}
          disabled={isSelectionMode || isBusy}
          title="Batch delete bookmarks"
          color="primary"
          startIcon={<AiTwotoneDelete size="1rem" />}
          variant="contained"
          fullWidth
          aria-label="delete"
        >
          Batch Delete
        </Button>
      </Grid>
      <Grid item sm={6}>
        <Button
          onClick={batchDeleteBookmarksById}
          disabled={!isSelectionMode || isBusy}
          title="Confirm batch delete bookmarks"
          color="primary"
          startIcon={<GiConfirmed size="1rem" />}
          variant="contained"
          fullWidth
          aria-label="delete"
        >
          Confirm
        </Button>
      </Grid>
      <Grid item sm={6}>
        <Button
          onClick={finishSelectionMode}
          disabled={!isSelectionMode || isBusy}
          title="Cancel batch delete bookmarks"
          color="primary"
          startIcon={<GiCancel size="1rem" />}
          variant="contained"
          fullWidth
          aria-label="cancel-delete"
        >
          Cancel
        </Button>
      </Grid>
    </Grid>
  );
};

export default NewBookmark;

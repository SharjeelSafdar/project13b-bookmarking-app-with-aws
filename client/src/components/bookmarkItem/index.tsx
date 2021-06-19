import React, { FC, useState } from "react";
import {
  Box,
  Checkbox,
  Container,
  IconButton,
  Typography,
} from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FiExternalLink } from "react-icons/fi";
import { FaCopy } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";

import { useAppContext } from "../../context/appContext";
import BookmarkModal from "../bookmarkModal";
import { useStyles } from "./styles";
import { Bookmark } from "../../graphql/api";

interface BookmarkItemProps {
  bookmark: Bookmark;
}

const BookmarkItem: FC<BookmarkItemProps> = ({ bookmark }) => {
  const {
    isSelectionMode,
    toggleBookmarkSelection,
    selectedBookmarks,
    isBusy,
    deleteBookmarkById,
  } = useAppContext();
  const [showEditBookmarkModal, setShowEditBookmarkModal] = useState(false);
  const classes = useStyles({ isSelectionMode });

  const isSelected = selectedBookmarks.includes(bookmark.id);

  return (
    <Container className={classes.container}>
      <Box className={classes.checkbox}>
        <Checkbox
          onClick={() => toggleBookmarkSelection(bookmark.id)}
          disabled={!isSelectionMode}
          checked={isSelected}
          title="Select bookmark"
          color="primary"
          size="small"
        />
      </Box>
      <Box>
        <Typography variant="body2">{bookmark.title}</Typography>
      </Box>
      <Box className={classes.externalLinkBtn}>
        <IconButton
          href={bookmark.url}
          target="_blank"
          title="Visit the link"
          color="primary"
          size="small"
          aria-label="external-link"
        >
          <FiExternalLink />
        </IconButton>
      </Box>
      <Box className={classes.editBtn}>
        <CopyToClipboard text={bookmark.url}>
          <IconButton
            title="Copy URL"
            color="primary"
            size="small"
            aria-label="copy-url"
          >
            <FaCopy />
          </IconButton>
        </CopyToClipboard>
      </Box>
      <Box className={classes.editBtn}>
        <IconButton
          onClick={() => setShowEditBookmarkModal(true)}
          disabled={isSelectionMode}
          title="Edit bookmark"
          color="primary"
          size="small"
          aria-label="edit bookmark"
        >
          <MdEdit />
        </IconButton>
        <BookmarkModal
          modalType="Edit"
          modalStatus={showEditBookmarkModal}
          closeModal={() => setShowEditBookmarkModal(false)}
          oldBookmark={bookmark}
        />
      </Box>
      <Box className={classes.deleteBtn}>
        <IconButton
          onClick={() => deleteBookmarkById(bookmark.id)}
          disabled={isBusy || isSelectionMode}
          title="Delete bookmark"
          color="primary"
          size="small"
          aria-label="delete bookmark"
        >
          <AiTwotoneDelete />
        </IconButton>
      </Box>
    </Container>
  );
};

export default BookmarkItem;

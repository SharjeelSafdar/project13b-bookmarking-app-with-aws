import React, { FC } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Paper,
  Typography,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import CustomTextField from "../customTextField";
import { useStyles } from "./styles";
import { useAppContext } from "../../context/appContext";
import { Bookmark } from "../../graphql/api";

export interface BookmarkModalProps {
  modalType: "New" | "Edit";
  modalStatus: boolean;
  closeModal: () => void;
  oldBookmark?: Bookmark;
}

type FormValueTypes = {
  title: string;
  url: string;
};

const BookmarkModal: FC<BookmarkModalProps> = ({
  modalType,
  modalStatus,
  closeModal,
  oldBookmark,
}) => {
  const classes = useStyles();
  const { isBusy, createNewBookmark, updateBookmark } = useAppContext();

  const initialValues: FormValueTypes = {
    title: oldBookmark ? oldBookmark.title : "",
    url: oldBookmark ? oldBookmark.url : "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    url: Yup.string().url("Must be a valid URL").required("Required"),
  });

  const onSubmit = async (values: FormValueTypes) => {
    const { title, url } = values;
    if (modalType === "New") {
      await createNewBookmark(title, url);
    } else if (!!oldBookmark) {
      await updateBookmark(oldBookmark.id, title, url);
    }
    closeModal();
  };

  return (
    <Modal open={modalStatus} onClose={closeModal}>
      <Paper elevation={3} className={classes.modal}>
        <Typography variant="h5" component="h2">
          {`${modalType} Bookmark`}
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isValid }) => (
            <Form>
              <Box marginTop={3} marginBottom={2}>
                <CustomTextField
                  name="title"
                  label="Title"
                  disabled={isBusy}
                  fullWidth
                  autoFocus
                />
              </Box>
              <Box marginBottom={2}>
                <CustomTextField
                  name="url"
                  label="URL"
                  disabled={isBusy}
                  fullWidth
                />
              </Box>
              <Button
                type="submit"
                disabled={!isValid || isBusy}
                startIcon={
                  isBusy ? <CircularProgress size="1rem" /> : undefined
                }
                variant="contained"
                color="primary"
                fullWidth
              >
                {modalType === "New"
                  ? isBusy
                    ? "Creating Bookmark"
                    : "Create Bookmark"
                  : isBusy
                  ? "Updating Bookmark"
                  : "Update Bookmark"}
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Modal>
  );
};

export default BookmarkModal;

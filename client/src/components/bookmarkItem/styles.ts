import { makeStyles, createStyles } from "@material-ui/core";

interface Props {
  isSelectionMode: boolean;
}

export const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      padding: theme.spacing(1),
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      borderRadius: theme.spacing(1),
      "&:hover": {
        boxShadow: theme.shadows[7],
      },
      "&:hover button": {
        visibility: "visible",
      },
      "&:hover a": {
        visibility: "visible",
      },
    },
    checkbox: (props: Props) => ({
      marginRight: theme.spacing(1),
      visibility: props.isSelectionMode ? "visible" : "hidden",
      width: props.isSelectionMode ? "fit-content" : 0,
    }),
    externalLinkBtn: {
      visibility: "hidden",
      marginLeft: "auto",
      marginRight: theme.spacing(1),
    },
    editBtn: {
      visibility: "hidden",
      marginRight: theme.spacing(1),
    },
    deleteBtn: {
      visibility: "hidden",
    },
  })
);

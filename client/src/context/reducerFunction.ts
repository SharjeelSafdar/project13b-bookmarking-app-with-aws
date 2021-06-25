import { Bookmark } from "../graphql/api";

export const reducerFunc = (
  state: ReducerState,
  action: Action
): ReducerState => {
  switch (action.id) {
    case "START_SELECTION_MODE": {
      return {
        ...state,
        isSelectionMode: true,
        selectedBookmarks: [],
      };
    }

    case "FINISH_SELECTION_MODE": {
      return {
        ...state,
        isSelectionMode: false,
        selectedBookmarks: [],
      };
    }

    case "TOGGLE_BOOKMARK_SELECTION": {
      return {
        ...state,
        selectedBookmarks: state.selectedBookmarks.includes(
          action.payload.bookmarkId
        )
          ? // Remove the id if already exists.
            state.selectedBookmarks.filter(
              id => id !== action.payload.bookmarkId
            )
          : // Add the id if doesn't exist already
            [...state.selectedBookmarks, action.payload.bookmarkId],
      };
    }

    case "SET_BOOKMARKS": {
      return {
        ...state,
        bookmarks: action.payload.bookmarks,
      };
    }

    case "ADD_NEW_BOOKMARK": {
      const isAlreadyIncluded =
        state.bookmarks.findIndex(
          bookmark => bookmark.id === action.payload.newBookmark.id
        ) !== -1;
      return {
        ...state,
        bookmarks: isAlreadyIncluded
          ? state.bookmarks
          : [...state.bookmarks, action.payload.newBookmark],
      };
    }

    case "UPDATE_BOOKMARK": {
      const newBookmarksArray = [...state.bookmarks];
      const bookmarkIndex = newBookmarksArray.findIndex(
        bookmark => bookmark.id === action.payload.newBookmark.id
      );
      if (bookmarkIndex !== -1) {
        newBookmarksArray[bookmarkIndex].title =
          action.payload.newBookmark.title;
        newBookmarksArray[bookmarkIndex].url = action.payload.newBookmark.url;
      }
      return {
        ...state,
        bookmarks: newBookmarksArray,
      };
    }

    case "DELETE_BOOKMARK": {
      return {
        ...state,
        bookmarks: state.bookmarks.filter(
          bookmark => bookmark.id !== action.payload.bookmarkId
        ),
      };
    }

    case "BATCH_DELETE_BOOKMARK": {
      return {
        ...state,
        bookmarks: state.bookmarks.filter(
          bookmark => !action.payload.bookmarkIds.includes(bookmark.id)
        ),
      };
    }

    default: {
      return state;
    }
  }
};

export interface ReducerState {
  bookmarks: Bookmark[];
  isSelectionMode: boolean;
  selectedBookmarks: string[];
}

type StartSelectionMode = {
  readonly id: "START_SELECTION_MODE";
  readonly payload?: null;
};
type FinishSelectionMode = {
  readonly id: "FINISH_SELECTION_MODE";
  readonly payload?: null;
};
type ToggleBookmarkSelection = {
  readonly id: "TOGGLE_BOOKMARK_SELECTION";
  readonly payload: { bookmarkId: string };
};

type SetBookmarks = {
  readonly id: "SET_BOOKMARKS";
  readonly payload: { bookmarks: Bookmark[] };
};

type AddNewBookmark = {
  readonly id: "ADD_NEW_BOOKMARK";
  readonly payload: { newBookmark: Bookmark };
};
type UpdateBookmark = {
  readonly id: "UPDATE_BOOKMARK";
  readonly payload: { newBookmark: Bookmark };
};
type DeleteBookmark = {
  readonly id: "DELETE_BOOKMARK";
  readonly payload: { bookmarkId: string };
};
type BatchDeleteBookmark = {
  readonly id: "BATCH_DELETE_BOOKMARK";
  readonly payload: { bookmarkIds: (string | undefined)[] };
};

export type Action =
  | StartSelectionMode
  | FinishSelectionMode
  | ToggleBookmarkSelection
  | SetBookmarks
  | AddNewBookmark
  | UpdateBookmark
  | DeleteBookmark
  | BatchDeleteBookmark;

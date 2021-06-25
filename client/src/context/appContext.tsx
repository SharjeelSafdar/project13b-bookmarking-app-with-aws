import React, {
  createContext,
  FC,
  useContext,
  useState,
  useEffect,
  useReducer,
  Reducer,
} from "react";
import { API } from "aws-amplify";

import { reducerFunc, ReducerState, Action } from "./reducerFunction";
import { bookmarks as getAllBookmarksQuery } from "../graphql/queries";
import {
  createBookmark,
  editBookmark,
  deleteBookmark,
  batchDeleteBookmarks,
} from "../graphql/mutations";
import {
  onCreateBookmark,
  onEditBookmark,
  onDeleteBookmark,
  onBatchDeleteBookmarks,
} from "../graphql/subscriptions";
import {
  BookmarksQuery,
  CreateBookmarkMutation,
  CreateBookmarkMutationVariables,
  EditBookmarkMutation,
  EditBookmarkMutationVariables,
  DeleteBookmarkMutation,
  DeleteBookmarkMutationVariables,
  BatchDeleteBookmarksMutation,
  BatchDeleteBookmarksMutationVariables,
  OnCreateBookmarkSubscription,
  OnEditBookmarkSubscription,
  OnDeleteBookmarkSubscription,
  OnBatchDeleteBookmarksSubscription,
} from "../graphql/api";

const reducerInitialState: ReducerState = {
  bookmarks: [],
  isSelectionMode: false,
  selectedBookmarks: [],
};

const initialState: ContextType = {
  ...reducerInitialState,
  isFetchingBookmarks: true,
  isBusy: false,
  startSelectionMode: () => {},
  finishSelectionMode: () => {},
  toggleBookmarkSelection: () => {},
  getAllBookmarks: () => {},
  createNewBookmark: () => {},
  updateBookmark: () => {},
  deleteBookmarkById: () => {},
  batchDeleteBookmarksById: () => {},
};

export const AppContext = createContext<ContextType>(initialState);

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider: FC = ({ children }) => {
  const [reducerState, dispatch] = useReducer<Reducer<ReducerState, Action>>(
    reducerFunc,
    reducerInitialState
  );
  const [isFetchingBookmarks, setIsFetchingBookmarks] = useState(
    initialState.isFetchingBookmarks
  );
  const [isBusy, setIsBusy] = useState(initialState.isBusy);

  const startSelectionMode = () => {
    dispatch({ id: "START_SELECTION_MODE" });
  };

  const finishSelectionMode = () => {
    dispatch({ id: "FINISH_SELECTION_MODE" });
  };

  const toggleBookmarkSelection = (bookmarkId: string) => {
    dispatch({ id: "TOGGLE_BOOKMARK_SELECTION", payload: { bookmarkId } });
  };

  /* *********************************************************** */
  /* ********************* Query Functions ********************* */
  /* *********************************************************** */
  const getAllBookmarks = async () => {
    setIsFetchingBookmarks(true);

    try {
      const response = (await API.graphql({
        query: getAllBookmarksQuery,
      })) as { data: BookmarksQuery };
      const bookmarks = response.data.bookmarks;

      dispatch({ id: "SET_BOOKMARKS", payload: { bookmarks } });
    } catch (err) {
      console.log("Error fetching bookmarks: ", JSON.stringify(err, null, 2));
    }

    setIsFetchingBookmarks(false);
  };

  /* ************************************************************** */
  /* ********************* Mutation Functions ********************* */
  /* ************************************************************** */
  const createNewBookmark = async (title: string, url: string) => {
    setIsBusy(true);

    try {
      const variables: CreateBookmarkMutationVariables = { title, url };
      const response = (await API.graphql({
        query: createBookmark,
        variables,
      })) as { data: CreateBookmarkMutation };
      const newBookmark = response.data.createBookmark;

      dispatch({ id: "ADD_NEW_BOOKMARK", payload: { newBookmark } });
    } catch (err) {
      console.log(
        "Error creating new bookmark: ",
        JSON.stringify(err, null, 2)
      );
    }

    setIsBusy(false);
  };

  const updateBookmark = async (id: string, title: string, url: string) => {
    setIsBusy(true);

    try {
      const variables: EditBookmarkMutationVariables = { id, title, url };
      const response = (await API.graphql({
        query: editBookmark,
        variables,
      })) as { data: EditBookmarkMutation };
      const newBookmark = response.data.editBookmark;

      dispatch({ id: "UPDATE_BOOKMARK", payload: { newBookmark } });
    } catch (err) {
      console.log("Error updating bookmark: ", err);
    }

    setIsBusy(false);
  };

  const deleteBookmarkById = async (id: string) => {
    setIsBusy(true);

    try {
      const variables: DeleteBookmarkMutationVariables = { id };
      const response = (await API.graphql({
        query: deleteBookmark,
        variables,
      })) as { data: DeleteBookmarkMutation };
      const bookmarkId = response.data.deleteBookmark.id;

      dispatch({ id: "DELETE_BOOKMARK", payload: { bookmarkId } });
    } catch (err) {
      console.log("Error deleting the bookmark: ", err);
    }

    setIsBusy(false);
  };

  const batchDeleteBookmarksById = async () => {
    setIsBusy(true);

    try {
      const variables: BatchDeleteBookmarksMutationVariables = {
        ids: reducerState.selectedBookmarks,
      };
      const response = (await API.graphql({
        query: batchDeleteBookmarks,
        variables,
      })) as { data: BatchDeleteBookmarksMutation };

      const bookmarkIds = response.data.batchDeleteBookmarks.map(
        bookmark => bookmark?.id
      );

      if (bookmarkIds) {
        dispatch({ id: "BATCH_DELETE_BOOKMARK", payload: { bookmarkIds } });
      }
    } catch (err) {
      console.log("Error deleting the bookmarks: ", err);
    }

    finishSelectionMode();
    setIsBusy(false);
  };

  /* ****************************************************************** */
  /* ********************* Subscription Functions ********************* */
  /* ****************************************************************** */
  const onCreateBookmarkSub = async () => {
    const subscription = API.graphql({
      query: onCreateBookmark,
    }) as any;

    subscription.subscribe({
      next: (status: { value: { data: OnCreateBookmarkSubscription } }) => {
        if (status.value.data.onCreateBookmark) {
          const newBookmark = status.value.data.onCreateBookmark;
          console.log("Sub: ", newBookmark);
          dispatch({ id: "ADD_NEW_BOOKMARK", payload: { newBookmark } });
        }
      },
    });
  };

  const OnEditBookmarkSub = async () => {
    const subscription = API.graphql({
      query: onEditBookmark,
    }) as any;

    subscription.subscribe({
      next: (status: { value: { data: OnEditBookmarkSubscription } }) => {
        if (status.value.data.onEditBookmark) {
          const newBookmark = status.value.data.onEditBookmark;
          console.log("Sub: ", newBookmark);
          dispatch({ id: "UPDATE_BOOKMARK", payload: { newBookmark } });
        }
      },
    });
  };

  const OnDeleteBookmarkSub = async () => {
    const subscription = API.graphql({
      query: onDeleteBookmark,
    }) as any;

    subscription.subscribe({
      next: (status: { value: { data: OnDeleteBookmarkSubscription } }) => {
        if (status.value.data.onDeleteBookmark) {
          const deletedBookmark = status.value.data.onDeleteBookmark;
          const bookmarkId = deletedBookmark.id;
          console.log("Sub: ", deletedBookmark);
          dispatch({ id: "DELETE_BOOKMARK", payload: { bookmarkId } });
        }
      },
    });
  };

  const OnBatchDeleteBookmarksSub = async () => {
    const subscription = API.graphql({
      query: onBatchDeleteBookmarks,
    }) as any;

    subscription.subscribe({
      next: (status: {
        value: { data: OnBatchDeleteBookmarksSubscription };
      }) => {
        if (status.value.data.onBatchDeleteBookmarks) {
          console.log("Sub: ", status.value.data.onBatchDeleteBookmarks);
          const bookmarkIds = status.value.data.onBatchDeleteBookmarks.map(
            bookmark => bookmark?.id
          );

          dispatch({ id: "BATCH_DELETE_BOOKMARK", payload: { bookmarkIds } });
        }
      },
    });
  };

  useEffect(() => {
    getAllBookmarks();
    onCreateBookmarkSub();
    OnEditBookmarkSub();
    OnDeleteBookmarkSub();
    OnBatchDeleteBookmarksSub();
  }, []);

  const value: ContextType = {
    ...reducerState,
    isFetchingBookmarks,
    isBusy,
    startSelectionMode,
    finishSelectionMode,
    toggleBookmarkSelection,
    getAllBookmarks,
    createNewBookmark,
    updateBookmark,
    deleteBookmarkById,
    batchDeleteBookmarksById,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export interface ContextType extends ReducerState {
  isFetchingBookmarks: boolean;
  isBusy: boolean;
  startSelectionMode: () => void;
  finishSelectionMode: () => void;
  toggleBookmarkSelection: (bookmarkId: string) => void;
  getAllBookmarks: () => void;
  createNewBookmark: (title: string, url: string) => void;
  updateBookmark: (id: string, title: string, url: string) => void;
  deleteBookmarkById: (id: string) => void;
  batchDeleteBookmarksById: () => void;
}

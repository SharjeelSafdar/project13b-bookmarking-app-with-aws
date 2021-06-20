import React, {
  createContext,
  FC,
  useContext,
  useState,
  useEffect,
} from "react";
import { API } from "aws-amplify";

import { bookmarks as getAllBookmarksQuery } from "../graphql/queries";
import {
  createBookmark,
  editBookmark,
  deleteBookmark,
  batchDeleteBookmarks,
} from "../graphql/mutations";
import {
  Bookmark,
  BookmarksQuery,
  CreateBookmarkMutation,
  CreateBookmarkMutationVariables,
  EditBookmarkMutation,
  EditBookmarkMutationVariables,
  DeleteBookmarkMutation,
  DeleteBookmarkMutationVariables,
  BatchDeleteBookmarksMutation,
  BatchDeleteBookmarksMutationVariables,
} from "../graphql/api";

export interface ContextType {
  bookmarks: Bookmark[];
  isFetchingBookmarks: boolean;
  isBusy: boolean;
  isSelectionMode: boolean;
  startSelectionMode: () => void;
  finishSelectionMode: () => void;
  selectedBookmarks: string[];
  toggleBookmarkSelection: (bookmarkId: string) => void;
  getAllBookmarks: () => void;
  createNewBookmark: (title: string, url: string) => void;
  updateBookmark: (id: string, title: string, url: string) => void;
  deleteBookmarkById: (id: string) => void;
  batchDeleteBookmarksById: () => void;
}

const initialState: ContextType = {
  bookmarks: [],
  isFetchingBookmarks: true,
  isBusy: false,
  isSelectionMode: false,
  startSelectionMode: () => {},
  finishSelectionMode: () => {},
  selectedBookmarks: [],
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
  const [bookmarks, setBookmarks] = useState(initialState.bookmarks);
  const [isFetchingBookmarks, setIsFetchingBookmarks] = useState(
    initialState.isFetchingBookmarks
  );
  const [isBusy, setIsBusy] = useState(initialState.isBusy);
  const [isSelectionMode, setSelectionMode] = useState(false);
  const [selectedBookmarks, setSelectedBookmarks] = useState<string[]>([]);

  const startSelectionMode = () => {
    setSelectionMode(true);
    setSelectedBookmarks([]);
  };

  const finishSelectionMode = () => {
    setSelectionMode(false);
    setSelectedBookmarks([]);
  };

  const selectBookmark = (bookmarkId: string) => {
    setSelectedBookmarks(prev => [...prev, bookmarkId]);
  };

  const unselectBookmark = (bookmarkId: string) => {
    setSelectedBookmarks(prev => prev.filter(id => id !== bookmarkId));
  };

  const toggleBookmarkSelection = (bookmarkId: string) => {
    if (!selectedBookmarks.includes(bookmarkId)) {
      selectBookmark(bookmarkId);
    } else {
      unselectBookmark(bookmarkId);
    }
  };

  const getAllBookmarks = async () => {
    setIsFetchingBookmarks(true);

    try {
      const response = (await API.graphql({
        query: getAllBookmarksQuery,
      })) as { data: BookmarksQuery };

      setBookmarks(response.data.bookmarks);
    } catch (err) {
      console.log("Error fetching bookmarks: ", JSON.stringify(err, null, 2));
    }

    setIsFetchingBookmarks(false);
  };

  const createNewBookmark = async (title: string, url: string) => {
    setIsBusy(true);

    try {
      const variables: CreateBookmarkMutationVariables = { title, url };
      const response = (await API.graphql({
        query: createBookmark,
        variables,
      })) as { data: CreateBookmarkMutation };
      setBookmarks(prev => [response.data.createBookmark, ...prev]);
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

      setBookmarks(prev => {
        const bookmarkIndex = prev.findIndex(bookmark => bookmark.id === id);
        if (bookmarkIndex !== -1) {
          prev[bookmarkIndex].title = response.data.editBookmark.title;
          prev[bookmarkIndex].url = response.data.editBookmark.url;
        }
        return prev;
      });
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

      setBookmarks(prev =>
        prev.filter(bookmark => bookmark.id !== response.data.deleteBookmark.id)
      );
    } catch (err) {
      console.log("Error deleting the bookmark: ", err);
    }

    setIsBusy(false);
  };

  const batchDeleteBookmarksById = async () => {
    setIsBusy(true);

    try {
      const variables: BatchDeleteBookmarksMutationVariables = {
        ids: selectedBookmarks,
      };
      const response = (await API.graphql({
        query: batchDeleteBookmarks,
        variables,
      })) as { data: BatchDeleteBookmarksMutation };

      const deletedIds = response.data.batchDeleteBookmarks.map(
        bookmark => bookmark?.id
      );

      setBookmarks(prev =>
        prev.filter(bookmark => !deletedIds.includes(bookmark.id))
      );
    } catch (err) {
      console.log("Error deleting the bookmarks: ", err);
    }

    finishSelectionMode();
    setIsBusy(false);
  };

  useEffect(() => {
    getAllBookmarks();
  }, []);

  const value: ContextType = {
    bookmarks,
    isFetchingBookmarks,
    isBusy,
    isSelectionMode,
    startSelectionMode,
    finishSelectionMode,
    selectedBookmarks,
    toggleBookmarkSelection,
    getAllBookmarks,
    createNewBookmark,
    updateBookmark,
    deleteBookmarkById,
    batchDeleteBookmarksById,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

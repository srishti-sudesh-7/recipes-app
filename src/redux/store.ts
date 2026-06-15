import { configureStore } from "@reduxjs/toolkit";
import editDialogReducer from "./editDialogSlice";
import recipesReducer from "./recipesSlice";

export const store =
  configureStore({
    reducer: {
      editDialog:
        editDialogReducer,

      recipes:
        recipesReducer,
    },
  });

export type RootState =
  ReturnType<
    typeof store.getState
  >;

export type AppDispatch =
  typeof store.dispatch;
import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction,} from "@reduxjs/toolkit";

import type {RecipeProps,} from "../hooks/useRecipesModal";

interface RecipeState {
  open: boolean;
  selectedRecipe: RecipeProps | null;
}

const initialState: RecipeState = {
  open: false,
  selectedRecipe: null,
};

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    openEditDialog: (state) => { state.open = true; },
    closeEditDialog: (state) => { state.open = false; },
    setSelectedRecipe: (
      state,
      action: PayloadAction<RecipeProps | null>
    ) => { state.selectedRecipe = action.payload;},
  },
});

export const {openEditDialog, closeEditDialog, setSelectedRecipe,} = recipeSlice.actions;

export default recipeSlice.reducer;
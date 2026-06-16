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
    openEditDialog: (state, action: PayloadAction<RecipeProps | null>) => 
      { state.open = true; 
        state.selectedRecipe = action.payload;
      },
    closeEditDialog: (state,) => { state.open = false; state.selectedRecipe = null;},
  },
});

export const {openEditDialog, closeEditDialog,} = recipeSlice.actions;

export default recipeSlice.reducer;
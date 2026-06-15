import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  RecipeProps,
} from "../hooks/useRecipesModal";

interface RecipesState {
  selectedRecipe:
    RecipeProps | null;
}

const initialState: RecipesState = {
  selectedRecipe: null,
};

const recipesSlice = createSlice({
  name: "recipes",

  initialState,

  reducers: {
    setSelectedRecipe: (
      state,

      action:
        PayloadAction<
          RecipeProps | null
        >
    ) => {
      state.selectedRecipe =
        action.payload;
    },
  },
});

export const {
  setSelectedRecipe,
} = recipesSlice.actions;

export default recipesSlice.reducer;
import { useState } from "react";

export interface RecipeProps {
  id: number;
  name: string;
  cuisine: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  image: string;
  ingredients?: string[];
  instructions?: string[];
}

interface RecipeForm {
  name: string;
  cuisine: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
}

export const useRecipesModal = () => {
  const [recipesList, setRecipesList] = useState<RecipeProps[]>([]);

  const getRecipes = async () => {
    try {
      const res = await fetch(
        "https://dummyjson.com/recipes"
      );

      const data = await res.json();

      const recipes: RecipeProps[] = data.recipes.map(
        (recipe: any) => ({
          id: recipe.id,
          name: recipe.name,
          cuisine: recipe.cuisine,
          prepTimeMinutes: recipe.prepTimeMinutes,
          cookTimeMinutes: recipe.cookTimeMinutes,
          image: recipe.image,
        })
      );

      setRecipesList(recipes);
    } catch (error) {
      console.error(error);
    }
  };

  const addRecipe = async (
    recipeData: RecipeForm
  ) => {
    try {
      const res = await fetch(
        "https://dummyjson.com/recipes/add",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(recipeData),
        }
      );

      const newRecipe = await res.json();

      const maxId = Math.max(
        ...recipesList.map(
          (recipe) => recipe.id
        )
      );

      const recipe: RecipeProps = {
        id: maxId + 1,
        name: newRecipe.name,
        cuisine: newRecipe.cuisine,
        prepTimeMinutes: newRecipe.prepTimeMinutes,
        cookTimeMinutes: newRecipe.cookTimeMinutes,
        image: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
      };

      setRecipesList([
        ...recipesList,
        recipe,
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  const updateRecipe = async (
    id: number,
    recipeData: RecipeForm
  ) => {
    try {
      const res = await fetch(
        `https://dummyjson.com/recipes/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(recipeData),
        }
      );

      const updatedRecipe =
        await res.json();

      setRecipesList(
        recipesList.map((recipe) =>
          recipe.id === id
            ? {
                ...recipe,
                name: updatedRecipe.name,
                cuisine: updatedRecipe.cuisine,
                prepTimeMinutes: updatedRecipe.prepTimeMinutes,
                cookTimeMinutes: updatedRecipe.cookTimeMinutes,
              }
            : recipe
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRecipe = async (id:number) => {
    try {
      await fetch(
        `https://dummyjson.com/recipes/${id}`,
        { method: "DELETE", }
      );

      setRecipesList((prev) => 
        prev.filter((recipe) => recipe.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const getRecipeById = async (
    id: number
  ) => {
    const res = await fetch(
      `https://dummyjson.com/recipes/${id}`
    );

    return await res.json();
  };

  return { recipesList, getRecipes, addRecipe, updateRecipe, deleteRecipe,getRecipeById,};
};
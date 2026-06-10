import { useEffect, useState } from "react";
import {
  Avatar, Box, Button, IconButton, Pagination,Paper,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import RecipeViewDialog from "./RecipeViewDialog.tsx";
import RecipeDialog from "./RecipeDialog.tsx";
import {
  type Recipe,
  useRecipesModal,
} from "../hooks/useRecipesModal";

export default function RecipeTable() {
  const {
    recipesList,
    getRecipes,
    getRecipeById,
    addRecipe,
    updateRecipe,
    deleteRecipe,
  } = useRecipesModal();

  const [openDialog, setOpenDialog] = useState(false);

  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const [openViewDialog, setOpenViewDialog] = useState(false);

  const [viewRecipe, setViewRecipe] = useState<Recipe | null>(null);


  useEffect(() => {
    getRecipes();
  }, []);

  const handleAddClick = () => {
    setSelectedRecipe(null);
    setOpenDialog(true);
  };

  const handleEditClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setOpenDialog(true);
  };

  const handleDialogSubmit = async (
    data: {
      name: string;
      cuisine: string;
      prepTimeMinutes: number;
      cookTimeMinutes: number;
    }
  ) => {
    if (selectedRecipe) {
      await updateRecipe(
        selectedRecipe.id,
        data
      );
    } else {
      await addRecipe(data);
    }
  };

  const handleViewClick = async (
    id: number
  ) => {
    const recipe =
      await getRecipeById(id);

    setViewRecipe(recipe);
    setOpenViewDialog(true);
  };
  
  const handleDeleteClick = async (
    id: number
  ) => {
    const confirmed = window.confirm(
      "Delete this recipe?"
    );

    if (!confirmed) return;

    await deleteRecipe(id);
  };

return (
<Box
  sx={{
    p: 4,
    backgroundColor: "#f5f7fb",
    minHeight: "100vh",
  }}
>
  <Box
    sx={{
      display: "flex",
      justifyContent: "flex-end",
      mb: 3,
    }}
  >
    <Button
      variant="contained"
      startIcon={<AddIcon />}
      onClick={handleAddClick}
      sx={{
        borderRadius: "10px",
        textTransform: "none",
        px: 3,
      }}
    >
      Add Recipe
    </Button>
  </Box>

  <TableContainer
    component={Paper}
    sx={{
      borderRadius: 3,
      boxShadow:
        "0 2px 10px rgba(0,0,0,0.05)",
    }}
  >
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Recipe Name</TableCell>
          <TableCell>Cuisine</TableCell>
          <TableCell>Prep Time</TableCell>
          <TableCell>Cook Time</TableCell>
          <TableCell>Image</TableCell>
          <TableCell align="center">Actions</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {recipesList.map((recipe) => (
          <TableRow key={recipe.id}>
            <TableCell> {recipe.id}</TableCell>
            <TableCell> {recipe.name}</TableCell>
            <TableCell> {recipe.cuisine}</TableCell>
            <TableCell> {recipe.prepTimeMinutes} min</TableCell>
            <TableCell> {recipe.cookTimeMinutes} min</TableCell>
            <TableCell>
              <Avatar
                src={recipe.image}
                variant="rounded"
                sx={{
                  width: 50,
                  height: 50,
                }}
              />
            </TableCell>

            <TableCell align="center">
                <IconButton
                  onClick={() =>
                    handleViewClick(recipe.id)
                  }
                  sx={{
                    bgcolor: "#eef3ff",
                    mr: 1,
                  }}
                >
                <VisibilityOutlinedIcon
                  sx={{
                    color: "#4f6ef7",
                  }}
                />
              </IconButton>

              <IconButton
                onClick={() =>
                  handleEditClick(
                    recipe
                  )
                }
                sx={{
                  bgcolor: "#eefcf3",
                  mr: 1,
                }}
              >
                <EditOutlinedIcon
                  sx={{
                    color: "#27ae60",
                  }}
                />
              </IconButton>

              <IconButton
                onClick={() =>
                  handleDeleteClick(
                    recipe.id
                  )
                }
                sx={{
                  bgcolor: "#fff0f0",
                }}
              >
                <DeleteOutlineOutlinedIcon
                  sx={{
                    color: "#eb5757",
                  }}
                />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

    <Box
      sx={{
        display: "flex",
        justifyContent:
          "space-between",
        alignItems: "center",
        p: 2,
      }}
    >
      <Typography variant="body2">
        Showing {recipesList.length} recipes
      </Typography>

      <Pagination
        count={4}
        page={1}
        color="primary"
      />
    </Box>
  </TableContainer>

  <RecipeDialog
    open={openDialog}
    onClose={() =>
      setOpenDialog(false)
    }
    onSubmit={handleDialogSubmit}
    recipe={selectedRecipe}
  />

  <RecipeViewDialog
  open={openViewDialog}
  onClose={() =>
    setOpenViewDialog(false)
  }
  recipe={viewRecipe}
/>

</Box>
);
}
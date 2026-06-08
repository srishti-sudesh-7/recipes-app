import {useEffect,useState} from "react";
import {
  Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Typography, Avatar, Pagination,
} from "@mui/material";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";

interface Recipe {
  id: number;
  name: string;
  cuisine: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  image: string;
}

export default function RecipeTable() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(
        "https://dummyjson.com/recipes"
      );

      const result = await response.json();

      const formattedRecipes: Recipe[] =
        result.recipes.map((recipe: any) => ({
          id: recipe.id,
          name: recipe.name,
          cuisine: recipe.cuisine,
          prepTimeMinutes: recipe.prepTimeMinutes,
          cookTimeMinutes: recipe.cookTimeMinutes,
          image: recipe.image,
        }));

      setRecipes(formattedRecipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleAddRecipe = async () => {
    try {
      const response = await fetch(
        "https://dummyjson.com/recipes/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: `Recipe ${recipes.length + 1}`,
            cuisine: "Cuisine",
            prepTimeMinutes: 0,
            cookTimeMinutes: 0,
          }),
        }
      );

      const newRecipe = await response.json();

      const maxid = Math.max( ...recipes.map((recipe) => recipe.id));

      setRecipes([
        ...recipes,
        {
          id: maxid+1,
          name: newRecipe.name,
          cuisine: newRecipe.cuisine,
          prepTimeMinutes: newRecipe.prepTimeMinutes,
          cookTimeMinutes: newRecipe.cookTimeMinutes,
          image:  "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
        },
      ]);
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };

  const handleDeleteRecipe = async (id: number) => {
  try {
    await fetch(
      `https://dummyjson.com/recipes/${id}`,
      {
        method: "DELETE",
      }
    );

    setRecipes(
      recipes.filter((recipe) => recipe.id !== id)
    );
  } catch (error) {
    console.error("Error deleting recipe:", error);
  }
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
          onClick={handleAddRecipe}
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
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
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
              <TableCell align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {recipes.map((recipe) => (
              <TableRow key={recipe.id}>
                <TableCell>{recipe.id}</TableCell>

                <TableCell>{recipe.name}</TableCell>

                <TableCell>
                  {recipe.cuisine}
                </TableCell>

                <TableCell>
                  {recipe.prepTimeMinutes} min
                </TableCell>

                <TableCell>
                  {recipe.cookTimeMinutes} min
                </TableCell>

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
                    sx={{
                      bgcolor: "#eef3ff",
                      mr: 1,
                    }}
                  >
                    <VisibilityOutlinedIcon
                      sx={{ color: "#4f6ef7" }}
                    />
                  </IconButton>

                  <IconButton
                    sx={{
                      bgcolor: "#eefcf3",
                      mr: 1,
                    }}
                  >
                    <EditOutlinedIcon
                      sx={{ color: "#27ae60" }}
                    />
                  </IconButton>

                  <IconButton
                    onClick={() => handleDeleteRecipe(recipe.id)}
                    sx={{
                      bgcolor: "#fff0f0",
                    }}
                  >
                    <DeleteOutlineOutlinedIcon
                      sx={{ color: "#eb5757" }}
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
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
          }}
        >
          <Typography variant="body2">
            Showing {recipes.length} recipes
          </Typography>

          <Pagination
            count={4}
            page={1}
            color="primary"
          />
        </Box>
      </TableContainer>
    </Box>
  );
}
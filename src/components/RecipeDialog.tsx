import {
  Button, Dialog, DialogActions, DialogContent,
  DialogTitle, TextField, Stack,
} from "@mui/material";

import { useEffect, useState } from "react";
import { type Recipe } from "../hooks/useRecipesModal";

interface RecipeDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    cuisine: string;
    prepTimeMinutes: number;
    cookTimeMinutes: number;
  }) => void;
  recipe?: Recipe | null;
}

export default function RecipeDialog({
  open,
  onClose,
  onSubmit,
  recipe,
}: RecipeDialogProps) {
  const [name, setName] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [prepTimeMinutes, setPrepTimeMinutes] =
    useState(0);
  const [cookTimeMinutes, setCookTimeMinutes] =
    useState(0);

  useEffect(() => {
    if (recipe) {
      setName(recipe.name);
      setCuisine(recipe.cuisine);
      setPrepTimeMinutes(recipe.prepTimeMinutes);
      setCookTimeMinutes(recipe.cookTimeMinutes);
    } else {
      setName("");
      setCuisine("");
      setPrepTimeMinutes(0);
      setCookTimeMinutes(0);
    }
  }, [recipe, open]);

  const handleSubmit = () => {
    onSubmit({ name, cuisine, prepTimeMinutes, cookTimeMinutes,});
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {recipe ? "Edit Recipe" : "Add Recipe"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Recipe Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            fullWidth
          />

          <TextField
            label="Cuisine"
            value={cuisine}
            onChange={(e) =>
              setCuisine(e.target.value)
            }
            fullWidth
          />

          <TextField
            label="Prep Time (mins)"
            type="number"
            value={prepTimeMinutes}
            onChange={(e) =>
              setPrepTimeMinutes(
                Number(e.target.value)
              )
            }
            fullWidth
          />

          <TextField
            label="Cook Time (mins)"
            type="number"
            value={cookTimeMinutes}
            onChange={(e) =>
              setCookTimeMinutes(
                Number(e.target.value)
              )
            }
            fullWidth
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
        >
          {recipe ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
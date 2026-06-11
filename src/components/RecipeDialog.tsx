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
  recipeProps?: Recipe | null;
}

export default function RecipeDialog({
  open,
  onClose,
  onSubmit,
  recipeProps,
}: RecipeDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    cuisine: "",
    prepTimeMinutes: 0,
    cookTimeMinutes: 0,
  });
  const [errors, setErrors] = useState({
    name: false,
    cuisine: false,
    prepTimeMinutes: false,
    cookTimeMinutes: false,
  });

  useEffect(() => {
    if (recipeProps) {
      setFormData({
        name: recipeProps.name,
        cuisine: recipeProps.cuisine,
        prepTimeMinutes: recipeProps.prepTimeMinutes,
        cookTimeMinutes: recipeProps.cookTimeMinutes,
      });
    } else {
      setFormData({
        name: "",
        cuisine: "",
        prepTimeMinutes: 0,
        cookTimeMinutes: 0,
      });
    }

    setErrors({
      name: false,
      cuisine: false,
      prepTimeMinutes: false,
      cookTimeMinutes: false,
    });
  }, [recipeProps, open]);

  const handleSubmit = () => {
    const nextErrors = {
      name: formData.name.trim() === "",
      cuisine: formData.cuisine.trim() === "",
      prepTimeMinutes: formData.prepTimeMinutes <= 0,
      cookTimeMinutes: formData.cookTimeMinutes <= 0,
    };

    if (
      nextErrors.name ||
      nextErrors.cuisine ||
      nextErrors.prepTimeMinutes ||
      nextErrors.cookTimeMinutes
    ) {
      setErrors(nextErrors);
      return;
    }

    onSubmit({
      name: formData.name.trim(),
      cuisine: formData.cuisine.trim(),
      prepTimeMinutes: formData.prepTimeMinutes,
      cookTimeMinutes: formData.cookTimeMinutes,
    });
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
        {recipeProps ? "Edit Recipe" : "Add Recipe"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Recipe Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            error={errors.name}
            helperText={errors.name ? "Recipe name is required" : ""}
            fullWidth
          />

          <TextField
            label="Cuisine"
            value={formData.cuisine}
            onChange={(e) =>
              setFormData({
                ...formData,
                cuisine: e.target.value,
              })
            }
            error={errors.cuisine}
            helperText={errors.cuisine ? "Cuisine is required" : ""}
            fullWidth
          />

          <TextField
            label="Prep Time (mins)"
            type="number"
            value={formData.prepTimeMinutes}
            onChange={(e) =>
              setFormData({
                ...formData,
                prepTimeMinutes: Number(e.target.value),
              })
            }
            error={errors.prepTimeMinutes}
            helperText={errors.prepTimeMinutes ? "Enter a valid prep time" : ""}
            fullWidth
          />

          <TextField
            label="Cook Time (mins)"
            type="number"
            value={formData.cookTimeMinutes}
            onChange={(e) =>
              setFormData({
                ...formData,
                cookTimeMinutes: Number(e.target.value),
              })
            }
            error={errors.cookTimeMinutes}
            helperText={errors.cookTimeMinutes ? "Enter a valid cook time" : ""}
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
          {recipeProps ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
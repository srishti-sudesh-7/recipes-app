import {
  Button, Dialog, DialogActions, DialogContent,
  DialogTitle, TextField, Stack,
} from "@mui/material";

import { useEffect, useState } from "react";
import { type RecipeProps } from "../hooks/useRecipesModal";

interface FieldState {
  value: string; error: string;
}

interface RecipeDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    cuisine: string;
    prepTimeMinutes: number;
    cookTimeMinutes: number;
  }) => void;
  recipeProps?: RecipeProps | null;
}

interface RecipeFormFields {
  name: FieldState;
  cuisine: FieldState;
  prepTimeMinutes: FieldState;
  cookTimeMinutes: FieldState;
}

const emptyFields: RecipeFormFields = {
  name:{ value: "", error: "" },
  cuisine:{ value: "", error: "" },
  prepTimeMinutes:{ value: "", error: "" },
  cookTimeMinutes:{ value: "", error: "" },
};

export default function RecipeDialog({
  open,
  onClose,
  onSubmit,
  recipeProps,
}: RecipeDialogProps) {

    const [fields, setFields] = useState<RecipeFormFields>(emptyFields);


  useEffect(() => {
    if (recipeProps) {
      setFields({
        name: { value: recipeProps.name, error: "" },
        cuisine: { value: recipeProps.cuisine, error: "" },
        prepTimeMinutes: { value: String(recipeProps.prepTimeMinutes), error: "" },
        cookTimeMinutes: { value: String(recipeProps.cookTimeMinutes), error: "" },
      });
    } else {
      setFields(emptyFields);
    }
  }, [recipeProps, open]);

  const handleChange = (field: keyof RecipeFormFields, value: string) => {
      setFields(prev => ({
        ...prev,
        [field]: { value, error: "" },
      }));
    };

  const checkFields = (): boolean => {
    const updated = { ...fields };
    let hasError = false;

    if (fields.name.value.trim() === "") {
      updated.name = { ...updated.name, error: "Recipe name is required" };
      hasError = true;
    }

    if (fields.cuisine.value.trim() === "") {
      updated.cuisine = { ...updated.cuisine, error: "Cuisine is required" };
      hasError = true;
    }

    if (!fields.prepTimeMinutes.value || Number(fields.prepTimeMinutes.value) <= 0) {
      updated.prepTimeMinutes = { ...updated.prepTimeMinutes, error: "Enter a valid prep time" };
      hasError = true;
    }

    if (!fields.cookTimeMinutes.value || Number(fields.cookTimeMinutes.value) <= 0) {
      updated.cookTimeMinutes = { ...updated.cookTimeMinutes, error: "Enter a valid cook time" };
      hasError = true;
    }

    setFields(updated);
    return hasError;
  };

  const handleSubmit = () => {
    if (checkFields()) return;

    onSubmit({
      name: fields.name.value.trim(),
      cuisine: fields.cuisine.value.trim(),
      prepTimeMinutes: Number(fields.prepTimeMinutes.value),
      cookTimeMinutes: Number(fields.cookTimeMinutes.value),
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
          {[
            { key: "name", label: "Recipe Name", type: "text" },
            {key: "cuisine", label: "Cuisine", type: "text" },
            { key: "prepTimeMinutes", label: "Prep Time (mins)", type: "number" },
            {key: "cookTimeMinutes", label: "Cook Time (mins)", type: "number" },
          ].map(({ key, label, type }) => (
            <TextField
              key={key}
              label={label}
              type={type}
              value={fields[key as keyof RecipeFormFields].value}
              onChange={(e) => handleChange(key as keyof RecipeFormFields, e.target.value)}
              error={!!fields[key as keyof RecipeFormFields].error}
              helperText={fields[key as keyof RecipeFormFields].error}
              fullWidth
            />
          ))}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel </Button>

        <Button variant="contained" onClick={handleSubmit}>
          {recipeProps ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
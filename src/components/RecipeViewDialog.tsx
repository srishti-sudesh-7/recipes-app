import {
  Dialog, DialogTitle, DialogContent,
Typography, List, ListItem, Button, DialogActions,
} from "@mui/material";

import { type Recipe } from "../hooks/useRecipesModal";

interface RecipeViewDialogProps {
  open: boolean;
  onClose: () => void;
  recipe: Recipe | null;
}

export default function RecipeViewDialog({
  open,
  onClose,
  recipe,
}: RecipeViewDialogProps) {
  if (!recipe) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle> {recipe.name} </DialogTitle>

      <DialogContent>
        <Typography
          variant="h6"
          sx={{ mb: 1 }}
        >
          Ingredients
        </Typography>

        <List>
          {recipe.ingredients?.map(
            (ingredient, index) => (
              <ListItem key={index}>
                • {ingredient}
              </ListItem>
            )
          )}
        </List>

        <Typography
          variant="h6"
          sx={{ mt: 2, mb: 1 }}
        >
          Instructions
        </Typography>

        <List>
          {recipe.instructions?.map(
            (instruction, index) => (
              <ListItem key={index}>
                {index + 1}. {instruction}
              </ListItem>
            )
          )}
        </List>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}> Close </Button>
      </DialogActions>
    </Dialog>
  );
}
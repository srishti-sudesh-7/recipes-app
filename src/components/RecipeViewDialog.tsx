import {
  Dialog, DialogTitle, DialogContent,
Typography, List, ListItem, Button, DialogActions,
} from "@mui/material";

import { type RecipeProps } from "../hooks/useRecipesModal";

interface RecipeViewDialogProps {
  open: boolean;
  onClose: () => void;
  recipeProps: RecipeProps | null;
}

export default function RecipeViewDialog({
  open,
  onClose,
  recipeProps,
}: RecipeViewDialogProps) {
  if (!recipeProps) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle> {recipeProps.name} </DialogTitle>

      <DialogContent>
        <Typography
          variant="h6"
          sx={{ mb: 1 }}
        >
          Ingredients
        </Typography>

        <List>
          {recipeProps.ingredients?.map(
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
          {recipeProps.instructions?.map(
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
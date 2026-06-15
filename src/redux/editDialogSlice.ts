import { createSlice } from "@reduxjs/toolkit";

interface EditDialogState {
  open: boolean;
}

const initialState: EditDialogState = {
  open: false,
};

const editDialogSlice = createSlice({
  name: "editDialog",

  initialState,

  reducers: {
    openEditDialog: (state) => {
      state.open = true;
    },

    closeEditDialog: (state) => {
      state.open = false;
    },
  },
});

export const {
  openEditDialog,
  closeEditDialog,
} = editDialogSlice.actions;

export default editDialogSlice.reducer;
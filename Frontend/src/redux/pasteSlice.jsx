import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPasteById = createAsyncThunk(
  "paste/fetchPasteById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${PASTE_URL}/${id}`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const pasteSlice = createSlice({
  name: "paste",
  initialState: {
    pastes: [],
    currentPaste: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPasteById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPasteById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPaste = action.payload;
      })
      .addCase(fetchPasteById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default pasteSlice.reducer;

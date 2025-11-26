import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchEvents } from "./eventsAPI";
import { EventsState } from "../api/eventTypes";


const initialState: EventsState = {
  data: [],
  favorites: [],
  loading: false,
  error: null,
};
const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const eventId = action.payload;
      const event = state.data.find(e => e.event_id === eventId);
      if (event) {
        event.isFavorite = !event.isFavorite;

        if (event.isFavorite) {
          state.favorites.push(event);
        } else {
          state.favorites = state.favorites.filter(fav => fav.event_id !== eventId);
        }
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchEvents.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.map(event => ({ ...event, isFavorite: false }));
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch events";
      });
  },
});

export const { toggleFavorite  } = eventsSlice.actions;
export default eventsSlice.reducer;

import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../api/baseUrl";
import { APIResponse, EventAPIResponse, FetchEventsPayload } from "../api/eventTypes";

export const fetchEvents = createAsyncThunk<
  EventAPIResponse[],                 
  FetchEventsPayload | void,          
  { rejectValue: string }             
>(
  "events/fetchEvents",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/events-listing`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload || {}),
      });

      const data: APIResponse = await res.json();

      if (!res.ok || !data.success) {
        return rejectWithValue(data.message || "Failed to fetch events");
      }

      return data.data.events;
    } catch (error) {
      return rejectWithValue("Network error");
    }
  }
);
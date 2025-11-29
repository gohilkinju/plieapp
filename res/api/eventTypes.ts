export interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  price?: string;
  tags?: string[];
  image?: string;
  isFavorite?: boolean;
  uniqueId:number;
}

export interface EventsState {
  data: Event[];
  loading: boolean;
  error: string | null;
  favorites: Event[];
}

export interface FetchEventsPayload {
  category?: string;
  date?: string;
  [key: string]: any;
}

export interface EventAPIResponse {
  event_id: number;
  event_name: string;
  description: string;
  event_profile_img: string;
  event_price_from: number;
  event_price_to: number;
  readable_from_date: string;
  readable_to_date: string;
  isFavorite: number; // 0 or 1
  city: string;
  country: string;
  keywords: string[];
  danceStyles: any[];
  event_date_id: number;
  event_url: string;
}
export interface APIResponse {
  success: boolean;
  message: string;
  data: {
    events: EventAPIResponse[];
    total: number;
  };
}

export interface debounceInterface {
  value: string;
  delay: number;
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T; // Data can be any structure
}

// Format 1: Paginated data
export interface DataPaginate<T> {
  total_items: number;
  page: number;
  items: T[];
  total_pages: number;
  links: Links;
}

export interface Links {
  prev: string | null;
  next: string | null;
}

export interface LoginData {
  email: string | null;
  name: string;
  role: string;
  token: string;
  type: string;
  user_data: string | null;
}

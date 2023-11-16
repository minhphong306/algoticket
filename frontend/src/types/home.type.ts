export type listEventItem = {
  date: number;
  description: string;
  author_id: string;
  created_at: string;
  feature_image: string;
  id: string;
  is_feature: string;
  location: string;
  name: string;
  updated_at: number;
  author_name: string;
  author_wallet_address: string;
  author_avatar: string;
};

export type ticketType = {
  id: string;
  name: string;
  current_qty: number;
  total_qty: number;
  price: string;
  amount: string;
  created_at: string;
  event_id: string;
  image_url: string;
  status: string;
  updated_at: null;
  type: number;
};

export type eventDetailType = {
  event: {
    id: string;
    name: string;
    date: string;
    description: string;
    feature_image: string;
    location: string;
  };
  tickets: ticketType[];
};

export interface Ticket {
  id: string;
  event_id: string;
  address: string;
  image_url: string;
  name: string;
  creator_name: string;
  owner_name: string;
  price: number;
  title: string;
  event_name: string;
  event_description: string;
  amount: string;
  status: string;
  created_at: string;
  updated_at: string;
  nft_id: string;
}

export interface Event {
  id: string;
  description?: string;
  name: string;
  image_url?: string;
}

export interface Profile {
  id: number;
  wallet_address: string;
  name: string;
  bio: string;
  avatar_url: string;
  socials: {
    twitter: string;
    facebook: string;
    instagram: string;
    linkedin: string;
  };
}

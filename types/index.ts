export interface Tweet {
  created_at: string;
  id: string;
  author_id: string;
  text: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  profile_image_url: string;
  verified: boolean;
}

export interface TweetError {
  title: string;
  detail: string;
  resource_type: string;
  parameter: string;
  value: string;
  type: string;
}

export interface TweetData {
  data: Tweet;
  includes: {
    users: User[];
  };
  errors?: TweetError[];
}

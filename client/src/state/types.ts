export interface State {
  mode: string;
  user: User | null;
  token: string | null;
  posts: Post[];
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  picturePath: string;
  friends: User[];
  location: string;
  occupation: string;
  viewedProfile: number;
  impressions: null;
}

export interface Post {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  location: string;
  description: string;
  picturePath: string;
  userPicturePath: string;
  likes: number;
  comments: string[];
}

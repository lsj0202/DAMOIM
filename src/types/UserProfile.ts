export type UserProfile = {
  email: string;
  password: string;
  name: string;
  avatar_url: string;
  age: number;
  location: string;
  introduce: string;
};

export type EditUserProfile = Omit<UserProfile, 'email' | 'password'>;

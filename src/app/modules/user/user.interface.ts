export type TUser = {
  name: string;
  email: string;
  password: string;
  role: string;
  image: string;
  bio: string;
  premiumMembership: boolean;
  followers: string[];
  following: string[];
  isBlocked: boolean;
  transactionId: string;
};

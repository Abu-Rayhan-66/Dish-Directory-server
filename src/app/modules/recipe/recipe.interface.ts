export type TRecipe = {
    user: string;
    title: string;
    image: string;
    cookingTime: number;
    upvote: string[];
    downvote: string[];
    comments: [
      { id: string; name: string; profilePicture: string; comment: string  },
    ];
    rating: [{ id: string; rating: number }];
    isPublished: boolean;
    isPremium: boolean;
  };
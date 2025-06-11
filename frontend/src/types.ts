// types.ts
export interface Tweet {
    _id: string;
    userId: string;
    text: string;
    createdAt: string;
    updatedAt: string;
    author?: {
      _id: string;
      email: string;
    };
  }
export interface User {
    _id: string;
    username: string;
    email: string;
    createdAt: string;
}
export interface TweetWithAuthor extends Omit<Tweet, 'author'> {
  author: User;
}

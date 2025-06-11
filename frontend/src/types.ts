// types.ts
export interface Tweet {
    _id: string;
    userId: string;
    text: string;
    createdAt: string;
    updatedAt: string;
  }
export interface User {
    _id: string;
    username: string;
    email: string;
    createdAt: string;
}
  
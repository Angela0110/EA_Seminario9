import { User } from "./user";

export interface Post {
    title: string;
    content: string;
    author: User; // Reference to the User collection
}
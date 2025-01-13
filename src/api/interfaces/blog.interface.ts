export interface Blog {
  title: string;
  content: string;
  authorId: number;
}

export interface DbBlog extends Blog {
  id: number;
  likes: number;
  createdAt: object;
  updatedAt: object;
}

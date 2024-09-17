export interface PostDataFormat {
  id: number;
  content: string;
  datetime_post: Date;
  author: {
    username: string | null;
    addname: string | null;
    image: string | null;
  };
  _count: {
    likedBy: number;
    bookmarkedBy: number;
    replies: number;
  };
  likedBy: {
    id: string;
  }[];
  bookmarkedBy: {
    id: string;
  }[];
  parentPost: {
    author: {
      addname: string | null;
    };
  } | null;
  parent_id: number | null;
}

export interface FetchPostsOptions {
  where?: object;
  orderBy?: object;
  selectLikeAndBookmarkFields?: object;
}
export const all_post = (
  skipcount,
  content,
  category,
  postsUserID,
  hasMoreItems,
) => {
  return {
    type: 'all_post',
    skipcount: skipcount,
    content: content,
    category: category,
    postsUserID: postsUserID,
    hasMoreItems: hasMoreItems,
  };
};

export const single_post = singlePostContent => {
  return {
    type: 'single_post',
    singlePostContent: singlePostContent,
  };
};

export const like_post = singlePostContent => {
  //console.log("****like post action", singlePostContent);
  return {
    type: 'like_post',
    singlePostContent: singlePostContent,
  };
};

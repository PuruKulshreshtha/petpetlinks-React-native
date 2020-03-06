export const comments = (commentsData, commentsSkipCount) => {
  //console.log("Comments action", commentsData, commentsCount);
  return {
    type: "comments",
    commentsData: commentsData,
    commentsSkipCount: commentsSkipCount
  };
};

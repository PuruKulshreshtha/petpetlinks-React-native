const initialState = {
  commentsData: [],
  commentsCount: 0,
  commentsSkipCount: 0,
  commentsLimitCount: 5
};

const commentsReducer = (state = initialState, action) => {
  //console.log("comments reducer", action);
  switch (action.type) {
    case "comments":
      if (action.commentsSkipCount > 0) {
        return {
          ...state,
          commentsData: [...state.commentsData, ...action.commentsData],
          commentsSkipCount: action.commentsSkipCount + state.commentsLimitCount
        };
      } else {
        return {
          ...state,
          commentsData: action.commentsData,
          commentsSkipCount: action.commentsSkipCount + state.commentsLimitCount
        };
      }
    default:
      return state;
  }
};

export default commentsReducer;

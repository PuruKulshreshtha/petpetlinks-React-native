const initialState = {
  content: [],
  singlePostContent: [],
  items: 0,
  postsperpage: 6,
  category: "",
  postsUserID: "",
  hasMoreItems: true
};

const allpostReducer = (state = initialState, action) => {
  //console.log(">typwe>>>>>>>", action.type, typeof action.type);
  switch (action.type) {
    case "single_post":
      return {
        ...state,
        singlePostContent: action.singlePostContent
      };

    case "like_post":
      //console.log("reducer likepost", state, action);
      const updatedContent = state.content.map(item => {
        if (item._id === action.singlePostContent[0]._id) {
          item.likes = action.singlePostContent[0].likes;
          return item;
        }
        return item;
      });
      return {
        ...state,
        content: updatedContent,
        singlePostContent: action.singlePostContent
      };
    case "all_post":
      //console.log("allpost reducer", action);
      if (action.skipcount > 0) {
        return {
          ...state,
          content: [...state.content, ...action.content],
          items: action.skipcount + state.postsperpage,
          category: action.category,
          postsUserID: action.postsUserID,
          hasMoreItems: action.hasMoreItems
        };
      } else {
        //console.log("all post reducer content");
        const itemsCount =
          action.content.length > 0
            ? action.skipcount + state.postsperpage
            : action.skipcount;
        return {
          ...state,
          content: action.content,
          items: itemsCount,
          category: action.category,
          postsUserID: action.postsUserID,
          hasMoreItems: action.hasMoreItems
        };
      }

    default:
      //console.log(">>>>>default>>>>>");
      return state;
  }
};

export default allpostReducer;

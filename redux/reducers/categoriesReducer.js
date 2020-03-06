const initialState = {
  categoriesData: []
};

const categoriesReducer = (state = initialState, action) => {
  //console.log("comments reducer", action);
  switch (action.type) {
    case "categories":
      return {
        ...state,
        categoriesData: action.categoriesData
      };
    default:
      return state;
  }
};

export default categoriesReducer;

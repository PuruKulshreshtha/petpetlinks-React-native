const initialState = {
  showPopup: false,
  showCategoryForm: false
};

const formsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "postUploadForm":
      return {
        ...state,
        showPopup: action.showPopup
      };
    case "categoryUploadForm":
      return {
        ...state,
        showCategoryForm: action.showCategoryForm
      };
    default:
      return state;
  }
};

export default formsReducer;

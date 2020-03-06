const initialState = {
  userID: ""
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "loginUser":
      return {
        ...state,
        userId: action.userID
      };
    case "logoutUser":
      return {
        ...state,
        userId: ""
      };
    default:
      return state;
  }
};

export default userReducer;

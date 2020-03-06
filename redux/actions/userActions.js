export const loginUser = userID => {
  //console.log("login action--", userID);
  return {
    type: "loginUser",
    userID: userID
  };
};

export const logoutUser = () => {
  //console.log("logout action--", userID);
  return {
    type: "logoutUser"
  };
};

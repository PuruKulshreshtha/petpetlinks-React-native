export const postUploadForm = showPopup => {
  console.log("postforms action--", showPopup);
  return {
    type: "postUploadForm",
    showPopup: showPopup
  };
};

export const categoryUploadForm = showCategoryForm => {
  console.log("categoryform action-----", showCategoryForm);
  return {
    type: "categoryUploadForm",
    showCategoryForm: showCategoryForm
  };
};

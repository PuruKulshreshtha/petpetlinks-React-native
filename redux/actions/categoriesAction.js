export const categories = categoriesData => {
  //console.log("Categories action", categoriesData);
  return {
    type: "categories",
    categoriesData: categoriesData
  };
};

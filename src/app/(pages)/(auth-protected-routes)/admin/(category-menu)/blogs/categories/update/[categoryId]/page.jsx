const UpdateBlogCategory = async ({ params }) => {
  const { categoryId } = await params;
  console.log("Category ID: ", categoryId);

  return <div>UpdateBlogCategory</div>;
};

export default UpdateBlogCategory;

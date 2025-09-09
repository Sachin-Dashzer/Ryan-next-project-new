import React from "react";
import { getAllBlogs } from "@/lib/blogData";
import BlogCarousel from "@/components/pages/blogBox";

const blogContent = async () => {
  const blogsNew = await getAllBlogs();

  return <div>

        <BlogCarousel blogsdata={blogsNew} />

  </div>;
};

export default blogContent;

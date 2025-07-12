// lib/blogData.js

const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/get-blog`;

/**
 * Get all blog posts
 */
export const getAllBlogs = async () => {
  try {
    const res = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const result = await res.json();
    return result.data || [];
  } catch (error) {
    console.error("getAllBlogs error:", error.message);
    return [];
  }
};

export const getBlogBySlug = async (slug) => {
  try {
    const res = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const result = await res.json();

    const blogs = result.data || [];

    return blogs.find((blog) => blog.pageUrl === slug) || null;
  } catch (error) {
    console.error("getBlogBySlug error:", error.message);
    return null;
  }
};

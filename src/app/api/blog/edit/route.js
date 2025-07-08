import { NextResponse } from "next/server";
import Blog from "@/models/blog";
import { withDB } from "@/lib/withDB";

const handler = async (req) => {
  const body = await req.json();

  const {
    id,
    metaTitle,
    metaDiscription,
    pageTitle,
    pageUrl,
    pageImageUrl,
    blogTitle,
    blogContent,
  } = body;

  if (!id) {
    return NextResponse.json(
      { success: false, message: "ID is required" },
      { status: 400 }
    );
  }

  const newBlog = await Blog.findByIdAndUpdate(
    id,
    {
      metaTitle,
      metaDiscription,
      pageTitle,
      pageUrl,
      pageImageUrl,
      blogTitle,
      blogContent,
    },
    { new: true }
  );

  if (!newBlog) {
    return NextResponse.json(
      { success: false, message: "Blog not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, data: newBlog }, { status: 200 });
};



export const PUT = withDB(handler);
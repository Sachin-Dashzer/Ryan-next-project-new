import { NextResponse } from "next/server";
import { withDB } from "@/lib/withDB";
import Blog from "@/models/blog";

const handler = async (req) => {
  const body = await req.json();

  const { metaTitle, metaDiscription ,pageTitle, pageUrl, pageImageUrl, blogTitle, blogContent } = body;

  if (!metaDiscription || !metaTitle || !pageTitle || !pageUrl || !pageImageUrl || !blogTitle || !blogContent) {
    return NextResponse.json(
      {
        message: "Please fill all the required fields",
        data: body,
      },
      { status: 400 }
    );
  }

  const existedBlog = await Blog.findOne({ pageUrl });

  if (existedBlog) {
    return NextResponse({
      message: "Blog already exists",
      data: body,
      status: 400,
    });
  }
  const newBlog = new Blog({
    metaTitle,
    metaDiscription,
    pageTitle,
    pageUrl,
    pageImageUrl,
    blogTitle,
    blogContent,
  });

  await newBlog.save();

  return NextResponse.json({
    message: "Blog received successfully!",
    data: body,
    status: 200,
  });
};

export const POST = withDB(handler);

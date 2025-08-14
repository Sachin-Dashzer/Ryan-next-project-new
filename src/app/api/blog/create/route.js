import { NextResponse } from "next/server";
import { withDB } from "@/lib/withDB";
import Blog from "@/models/blog";

const handler = async (req) => {
  const body = await req.json();

  const {
    metaTitle,
    metaDiscription,
    pageTitle,
    pageUrl,
    pageImageUrl,
    blogTitle,
    blogContent,
  } = body;

  // ===== VALIDATION =====
  if (
    !metaTitle?.trim() ||
    !metaDiscription?.trim() ||
    !pageTitle?.trim() ||
    !pageUrl?.trim() ||
    !blogTitle?.trim() ||
    !blogContent?.trim()
  ) {
    return NextResponse.json(
      { message: "Please fill all the required fields", data: body },
      { status: 400 }
    );
  }

  if (pageTitle.length < 3) {
    return NextResponse.json(
      { message: "Page title must be at least 3 characters long" },
      { status: 400 }
    );
  }

  if (blogTitle.length < 3) {
    return NextResponse.json(
      { message: "Blog title must be at least 3 characters long" },
      { status: 400 }
    );
  }

  if (blogContent.length < 20) {
    return NextResponse.json(
      { message: "Blog content must be at least 20 characters long" },
      { status: 400 }
    );
  }

  // ===== CHECK IF BLOG ALREADY EXISTS =====
  const existedBlog = await Blog.findOne({ pageUrl });

  if (existedBlog) {
    return NextResponse.json(
      { message: "Blog already exists with this page URL", data: body },
      { status: 409 }
    );
  }

  // ===== CREATE NEW BLOG =====
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

  return NextResponse.json(
    { message: "Blog created successfully!", data: newBlog },
    { status: 201 }
  );
};

export const POST = withDB(handler);

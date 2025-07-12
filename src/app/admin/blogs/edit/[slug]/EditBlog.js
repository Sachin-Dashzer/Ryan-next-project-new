"use client";

import { useRef, useState, useEffect } from "react";
import AdminHeader from "@/components/admin/adminHeader";
import dynamic from "next/dynamic";
import ImageUploader from "@/components/admin/ImageUploader";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
  loading: () => <p className="py-4">Loading editor...</p>,
});
import "suneditor/dist/css/suneditor.min.css";

const EditBlog = ({ initialData }) => {
  const editorRef = useRef(null);
  const [editorReady, setEditorReady] = useState(false);

  const [formData, setFormData] = useState({
    _id: "",
    metaTitle: "",
    metaDiscription: "",
    pageTitle: "",
    pageUrl: "",
    pageImageUrl: "",
    blogTitle: "",
    blogContent: "",
  });

  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        _id: initialData._id || "",
        metaTitle: initialData.metaTitle || "",
        metaDiscription: initialData.metaDiscription || "",
        pageTitle: initialData.pageTitle || "",
        pageUrl: initialData.pageUrl || "",
        pageImageUrl: initialData.pageImageUrl || "",
        blogTitle: initialData.blogTitle || "",
        blogContent: initialData.blogContent || "",
      });
      setDataLoaded(true);
    }
  }, [initialData]);

  const handleEditorLoad = (sunEditor) => {
    editorRef.current = sunEditor;
    setEditorReady(true);
  };

  useEffect(() => {
    if (editorReady && dataLoaded && formData.blogContent) {
      try {
        editorRef.current.setContents(formData.blogContent);
      } catch (error) {
        console.error("Error setting editor contents:", error);
      }
    }
  }, [editorReady, dataLoaded, formData.blogContent]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditorChange = (content) => {
    setFormData((prev) => ({
      ...prev,
      blogContent: content,
    }));
  };

  const handleImageUpload = (url) => {
    setFormData((prev) => ({
      ...prev,
      pageImageUrl: url,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(`/api/blog/edit/${formData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update blog");
      }

      if (!data.success) {
        throw new Error(data.message || "Blog update failed");
      }

      alert("Blog updated successfully!");

    } catch (error) {
      console.error("Update error:", error);
      alert(error.message || "Error updating blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!dataLoaded) {
    return (
      <section className="p-4">
        <AdminHeader title="/ Edit Blog" />
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading blog data...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="p-4">
      <AdminHeader title="/ Edit Blog" />

      <form
        onSubmit={handleSubmit}
        className="space-y-6 px-6 mx-auto max-w-6xl"
      >
        <h3 className="text-2xl font-bold underline mb-5">Meta Details</h3>

        <div className="flex gap-6 flex-col md:flex-row">
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Meta Title
            </label>
            <input
              type="text"
              name="metaTitle"
              value={formData.metaTitle}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter meta title"
              maxLength="60"
            />
            <p className="text-xs text-gray-500 mt-1">
              Recommended: 50-60 characters
            </p>
          </div>

          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Meta Description
            </label>
            <input
              name="metaDiscription"
              value={formData.metaDiscription}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter meta description"
              // rows="3"
              maxLength="60"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Recommended: 150-160 characters
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold underline mb-5">Banner Content</h3>

        <div className="flex gap-6 flex-col md:flex-row">
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Page URL
            </label>
            <input
              type="text"
              name="pageUrl"
              value={formData.pageUrl}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://your-page-url.com"
            />
            <p className="text-xs text-gray-500 mt-1">
              Must start with http:// or https://
            </p>
          </div>

          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Banner Title
            </label>
            <input
              type="text"
              name="pageTitle"
              value={formData.pageTitle}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter page title"
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Banner Image
          </label>
          <ImageUploader
            onUpload={handleImageUpload}
            initialImage={formData.pageImageUrl}
          />
          <p className="text-xs text-gray-500 mt-1">
            Recommended size: 1200x630 pixels
          </p>
        </div>

        <h3 className="text-2xl font-bold underline mt-10 mb-5">
          Blog Body Content
        </h3>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Blog Title
          </label>
          <input
            type="text"
            name="blogTitle"
            value={formData.blogTitle}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter blog title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Blog Content
          </label>
          <SunEditor
            getSunEditorInstance={handleEditorLoad}
            onChange={handleEditorChange}
            setContents={formData.blogContent}
            setOptions={{
              height: "400px",
              buttonList: [
                ["undo", "redo"],
                ["font", "fontSize", "formatBlock"],
                [
                  "bold",
                  "underline",
                  "italic",
                  "strike",
                  "subscript",
                  "superscript",
                ],
                ["fontColor", "hiliteColor"],
                ["align", "horizontalRule", "list", "table"],
                ["link", "image", "video"],
                ["fullScreen", "showBlocks", "codeView"],
                ["preview", "print"],
              ],
              defaultStyle:
                "font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; font-size: 16px;",
              imageUploadUrl: "/api/upload", // Your image upload endpoint
            }}
          />
        </div>

        <div className="pt-6 pb-10">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed text-lg font-medium"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Updating...
              </span>
            ) : (
              "Update Blog"
            )}
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditBlog;

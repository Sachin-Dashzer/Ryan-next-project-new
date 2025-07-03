"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Plus, Trash, Save, ChevronRight } from "lucide-react";
const SunEditor = dynamic(() => import("suneditor-react"), { ssr: false });
import "suneditor/dist/css/suneditor.min.css";

export default function CreateServicePage() {
  const editorRef = useRef(null);

  const [form, setForm] = useState({
    metadata: { title: "", description: "", pageurl: "" },
    bannerData: { title: "", description: "", url: "" },
    overviewData: "",
    typesData: { images: ["", "", ""], details: "" },
    benefitsData: { details: "", image: "" },
    faq: { entries: [{ question: "", answer: "" }] },
    extraFields: { detail1: "", detail2: "" },
  });
  const [serverMsg, setServerMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // ---------- helpers ---------- //
  function update(path, value) {
    setForm((prev) => {
      const next = structuredClone(prev);
      path.reduce((obj, key, idx) => {
        if (idx === path.length - 1) obj[key] = value;
        else obj = obj[key];
        return obj;
      }, next);
      return next;
    });
  }

  // Array helpers for FAQ
  const addFAQItem = () => {
    const newEntries = [...form.faq.entries, { question: "", answer: "" }];
    update(["faq", "entries"], newEntries);
  };

  const updateFAQItem = (i, field) => (e) => {
    const newEntries = [...form.faq.entries];
    newEntries[i][field] = e.target.value;
    update(["faq", "entries"], newEntries);
  };

  const removeFAQItem = (i) => () => {
    const newEntries = form.faq.entries.filter((_, idx) => idx !== i);
    update(
      ["faq", "entries"],
      newEntries.length ? newEntries : [{ question: "", answer: "" }]
    );
  };

  const handleEditorChange = (content) => {
    setFormData((prev) => ({
      ...prev,
      blogContent: content,
    }));
  };

  // Helper for image URLs (fixed 3 items)
  const updateImageItem = (i) => (e) => {
    const newImages = [...form.typesData.images];
    newImages[i] = e.target.value;
    update(["typesData", "images"], newImages);
  };

  // ---------- submit ---------- //
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setServerMsg("");

    try {
      const res = await fetch("/api/services/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setServerMsg(
        data.ok ? "Service created successfully!" : `Error: ${data.message}`
      );
      if (data.ok)
        setForm({
          metadata: { title: "", description: "", pageurl: "" },
          bannerData: { title: "", description: "", url: "" },
          overviewData: "",
          typesData: { images: ["", "", ""], details: "" },
          benefitsData: { details: "", image: "" },
          faq: { entries: [{ question: "", answer: "" }] },
          extraFields: { detail1: "", detail2: "" },
        });
    } catch (err) {
      setServerMsg(`Request failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // ---------- UI builders ---------- //
  const renderFAQEntries = () => {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">FAQ Entries</h3>
          <button
            type="button"
            onClick={addFAQItem}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add FAQ
          </button>
        </div>
        <div className="space-y-6">
          {form.faq.entries.map((entry, i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  FAQ {i + 1}
                </span>
                {form.faq.entries.length > 1 && (
                  <button
                    type="button"
                    onClick={removeFAQItem(i)}
                    className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question
                </label>
                <input
                  type="text"
                  value={entry.question}
                  onChange={updateFAQItem(i, "question")}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="Enter FAQ question"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Answer
                </label>
                <textarea
                  value={entry.answer}
                  onChange={updateFAQItem(i, "answer")}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                  placeholder="Enter FAQ answer"
                  required
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen ">
      <div>
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900">
            Create New Service
          </h1>
          <p className="mt-2 text-gray-600">
            Fill out the form below to create a new service for your platform.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="space-y-12">
          {/* Metadata Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Service Metadata
              </h2>
              <p className="text-gray-600">
                Basic information about your service
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Title
                </label>
                <input
                  type="text"
                  placeholder="Enter service title"
                  value={form.metadata.title}
                  onChange={(e) =>
                    update(["metadata", "title"], e.target.value)
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <input
                  type="text"
                  placeholder="Brief description"
                  value={form.metadata.description}
                  onChange={(e) =>
                    update(["metadata", "description"], e.target.value)
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  required
                />
              </div>
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Page URL
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/service-page"
                  value={form.metadata.pageurl}
                  onChange={(e) =>
                    update(["metadata", "pageurl"], e.target.value)
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  required
                />
              </div>
            </div>
          </div>

          {/* Banner Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Banner Configuration
              </h2>
              <p className="text-gray-600">
                Set up the main banner for your service page
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Banner Title
                </label>
                <input
                  type="text"
                  placeholder="Main banner title"
                  value={form.bannerData.title}
                  onChange={(e) =>
                    update(["bannerData", "title"], e.target.value)
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Banner Description
                </label>
                <input
                  type="text"
                  placeholder="Banner subtitle or description"
                  value={form.bannerData.description}
                  onChange={(e) =>
                    update(["bannerData", "description"], e.target.value)
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  required
                />
              </div>
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Banner Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/banner-image.jpg"
                  value={form.bannerData.url}
                  onChange={(e) =>
                    update(["bannerData", "url"], e.target.value)
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  required
                />
              </div>
            </div>
          </div>

          {/* Overview Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Service Overview
              </h2>
              <p className="text-gray-600">Detailed overview of your service</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Overview Content
              </label>
              <SunEditor
                getSunEditorInstance={(sunEditor) => {
                  editorRef.current = sunEditor;
                }}
                onChange={handleEditorChange}
                defaultValue=""
                setOptions={{
                  height: 300,
                  buttonList: [
                    [
                      "undo",
                      "redo",
                      "formatBlock",
                      "bold",
                      "underline",
                      "italic",
                      "fontColor",
                      "hiliteColor",
                      "align",
                      "list",
                      "link",
                      "image",
                      "codeView",
                    ],
                  ],
                }}
              />
            </div>
          </div>

          {/* Types Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Service Types
              </h2>
              <p className="text-gray-600">
                Define your service type and add three representative images
              </p>
            </div>
            <div className="space-y-8">
              {/* Type Details - Single Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type Description
                </label>
                <SunEditor
                  getSunEditorInstance={(sunEditor) => {
                    editorRef.current = sunEditor;
                  }}
                  onChange={handleEditorChange}
                  defaultValue=""
                  setOptions={{
                    height: 300,
                    buttonList: [
                      [
                        "undo",
                        "redo",
                        "formatBlock",
                        "bold",
                        "underline",
                        "italic",
                        "fontColor",
                        "hiliteColor",
                        "align",
                        "list",
                        "link",
                        "image",
                        "codeView",
                      ],
                    ],
                  }}
                />
              </div>

              {/* Image URLs - Fixed 3 */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Service Images (3 required)
                </h3>
                <div className="space-y-4">
                  {form.typesData.images.map((imageUrl, i) => (
                    <div key={i}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image {i + 1} URL
                      </label>
                      <input
                        type="url"
                        value={imageUrl}
                        onChange={updateImageItem(i)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        placeholder={`https://example.com/service-image-${
                          i + 1
                        }.jpg`}
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Service Benefits
              </h2>
              <p className="text-gray-600">
                Highlight the key benefits of your service
              </p>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Benefits Description
                </label>
                <SunEditor
                  getSunEditorInstance={(sunEditor) => {
                    editorRef.current = sunEditor;
                  }}
                  onChange={handleEditorChange}
                  defaultValue=""
                  setOptions={{
                    height: 300,
                    buttonList: [
                      [
                        "undo",
                        "redo",
                        "formatBlock",
                        "bold",
                        "underline",
                        "italic",
                        "fontColor",
                        "hiliteColor",
                        "align",
                        "list",
                        "link",
                        "image",
                        "codeView",
                      ],
                    ],
                  }}
                />{" "}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Benefits Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/benefits-image.jpg"
                  value={form.benefitsData.image}
                  onChange={(e) =>
                    update(["benefitsData", "image"], e.target.value)
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  required
                />
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600">
                Add common questions and answers about your service
              </p>
            </div>
            {renderFAQEntries()}
          </div>

          {/* Extra Fields Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Additional Information
              </h2>
              <p className="text-gray-600">
                Any additional details or custom fields
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Detail 1
                </label>
                <input
                  type="text"
                  placeholder="Enter additional detail"
                  value={form.extraFields.detail1}
                  onChange={(e) =>
                    update(["extraFields", "detail1"], e.target.value)
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Detail 2
                </label>
                <input
                  type="text"
                  placeholder="Enter additional detail"
                  value={form.extraFields.detail2}
                  onChange={(e) =>
                    update(["extraFields", "detail2"], e.target.value)
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  required
                />
              </div>
            </div>
          </div>

          {/* Submit Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Ready to Create Service?
                </h3>
                <p className="text-sm text-gray-600">
                  Review all information before submitting
                </p>
              </div>
              <button
                type="submit"
                disabled={loading}
                onClick={handleSubmit}
                className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Create Service
                  </>
                )}
              </button>
            </div>

            {serverMsg && (
              <div
                className={`mt-4 p-4 rounded-lg ${
                  serverMsg.includes("Error") || serverMsg.includes("failed")
                    ? "bg-red-50 text-red-700 border border-red-200"
                    : "bg-green-50 text-green-700 border border-green-200"
                }`}
              >
                {serverMsg}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

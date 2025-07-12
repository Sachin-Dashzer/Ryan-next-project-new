"use client";

import { useRef, useState, useCallback, useMemo, memo } from "react";
import dynamic from "next/dynamic";
import { Plus, Trash, Save } from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";

const SunEditor = dynamic(() => import("suneditor-react"), { ssr: false });
import "suneditor/dist/css/suneditor.min.css";

// Memoized Input Field Component
const InputField = memo(
  ({ label, value, onChange, placeholder, required, type = "text" }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
      />
    </div>
  )
);

// Memoized Editor Field Component
const EditorField = memo(
  ({ label, editorRef, onChange, defaultValue, editorId }) => {
    const [editorError, setEditorError] = useState(null);

    const handleEditorError = useCallback((error) => {
      console.warn("SunEditor error caught:", error);
      setEditorError(error);
    }, []);

    const getSunEditorInstance = useCallback(
      (sunEditor) => {
        if (sunEditor) {
          try {
            editorRef.current = sunEditor;
            if (sunEditor.options) {
              sunEditor.options.enableAutoSize = false;
            }
          } catch (error) {
            console.warn("Error setting up editor instance:", error);
            handleEditorError(error);
          }
        }
      },
      [editorRef, handleEditorError]
    );

    const handleLoad = useCallback(() => {
      try {
        if (editorRef.current && defaultValue) {
          editorRef.current.setContents(defaultValue);
        }
      } catch (error) {
        console.warn("Error loading editor content:", error);
        handleEditorError(error);
      }
    }, [editorRef, defaultValue, handleEditorError]);

    const sunEditorOptions = useMemo(
      () => ({
        height: "400px",
        buttonList: [
          ["undo", "redo"],
          ["font", "fontSize", "formatBlock"],
          ["bold", "underline", "italic", "strike", "subscript", "superscript"],
          ["fontColor", "hiliteColor"],
          ["align", "horizontalRule", "list", "table"],
          ["link", "image", "video"],
          ["fullScreen", "showBlocks", "codeView"],
          ["preview", "print"],
        ],
        defaultStyle:
          "font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; font-size: 16px;",
      }),
      []
    );

    if (editorError) {
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
          <div className="w-full p-4 border border-red-300 rounded-lg bg-red-50">
            <p className="text-red-700 text-sm mb-2">
              Editor temporarily unavailable. Attempting to recover...
            </p>
            <textarea
              value={defaultValue || ""}
              onChange={(e) => onChange(e.target.value)}
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Enter content here..."
            />
          </div>
        </div>
      );
    }

    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
        <div className="sun-editor-wrapper">
          <SunEditor
            key={editorId}
            getSunEditorInstance={getSunEditorInstance}
            onChange={onChange}
            defaultValue={defaultValue || ""}
            setOptions={sunEditorOptions}
            onLoad={handleLoad}
            onError={handleEditorError}
            disable={false}
            readOnly={false}
            placeholder="Enter content here..."
            autoFocus={false}
            lang="en"
          />
        </div>
      </div>
    );
  }
);

// Memoized Section Component
const Section = memo(({ title, description, children }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-8">
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
    {children}
  </div>
));

// Memoized FAQ Item Component
const FAQItem = memo(
  ({ entry, index, onQuestionChange, onAnswerChange, onRemove, canRemove }) => (
    <div className="bg-gray-50 rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">
          FAQ {index + 1}
        </span>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
          >
            <Trash className="h-4 w-4" />
          </button>
        )}
      </div>
      <InputField
        label="Question"
        value={entry.question}
        onChange={onQuestionChange}
        placeholder="Enter FAQ question"
        required={true}
      />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Answer
        </label>
        <textarea
          value={entry.answer}
          onChange={onAnswerChange}
          rows={3}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
          placeholder="Enter FAQ answer"
          required
        />
      </div>
    </div>
  )
);

// Set display names for better debugging
InputField.displayName = "InputField";
EditorField.displayName = "EditorField";
Section.displayName = "Section";
FAQItem.displayName = "FAQItem";

export default function CreateServicePage() {
  // Editor refs
  const overviewEditorRef = useRef(null);
  const typesEditorRef = useRef(null);
  const benefitsEditorRef = useRef(null);
  const additionalDetail1EditorRef = useRef(null);
  const additionalDetail2EditorRef = useRef(null);

  // Form state
  const [form, setForm] = useState({
    metadata: { title: "", description: "", pageurl: "" },
    bannerData: { title: "", description: "", imageurl: "" },
    overviewData: "",
    typesData: { images: ["", "", ""], details: "" },
    benefitsData: { details: "", image: "" },
    faq: { entries: [{ question: "", answer: "" }] },
    extraFields: { detail1: "", detail2: "" },
  });
  const [serverMsg, setServerMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Optimized form update helper with batch updates
  const updateForm = useCallback((updates) => {
    setForm((prev) => {
      const next = { ...prev };

      // Handle multiple updates in a single setState call
      if (Array.isArray(updates)) {
        updates.forEach(({ path, value }) => {
          path.reduce((obj, key, idx) => {
            if (idx === path.length - 1) obj[key] = value;
            else obj = obj[key];
            return obj;
          }, next);
        });
      } else {
        const { path, value } = updates;
        path.reduce((obj, key, idx) => {
          if (idx === path.length - 1) obj[key] = value;
          else obj = obj[key];
          return obj;
        }, next);
      }

      return next;
    });
  }, []);

  // Memoized handlers to prevent unnecessary re-renders
  const handleMetadataChange = useCallback(
    (field) => (e) => {
      updateForm({ path: ["metadata", field], value: e.target.value });
    },
    [updateForm]
  );

  const handleBannerDataChange = useCallback(
    (field) => (e) => {
      updateForm({ path: ["bannerData", field], value: e.target.value });
    },
    [updateForm]
  );

  // Editor change handlers
  const handleOverviewChange = useCallback(
    (content) => {
      updateForm({ path: ["overviewData"], value: content });
    },
    [updateForm]
  );

  const handleTypesChange = useCallback(
    (content) => {
      updateForm({ path: ["typesData", "details"], value: content });
    },
    [updateForm]
  );

  const handleBenefitsChange = useCallback(
    (content) => {
      updateForm({ path: ["benefitsData", "details"], value: content });
    },
    [updateForm]
  );

  const handleAdditionalDetail1Change = useCallback(
    (content) => {
      updateForm({ path: ["extraFields", "detail1"], value: content });
    },
    [updateForm]
  );

  const handleAdditionalDetail2Change = useCallback(
    (content) => {
      updateForm({ path: ["extraFields", "detail2"], value: content });
    },
    [updateForm]
  );

  // Image upload handlers
  const handleBannerImageUpload = useCallback(
    (url) => {
      updateForm({ path: ["bannerData", "imageurl"], value: url });
    },
    [updateForm]
  );

  const handleServiceImageUpload = useCallback(
    (index) => (url) => {
      const newImages = [...form.typesData.images];
      newImages[index] = url;
      updateForm({ path: ["typesData", "images"], value: newImages });
    },
    [form.typesData.images, updateForm]
  );

  const handleBenefitsImageUpload = useCallback(
    (url) => {
      updateForm({ path: ["benefitsData", "image"], value: url });
    },
    [updateForm]
  );

  // FAQ management with memoized handlers
  const addFAQItem = useCallback(() => {
    const newEntries = [...form.faq.entries, { question: "", answer: "" }];
    updateForm({ path: ["faq", "entries"], value: newEntries });
  }, [form.faq.entries, updateForm]);

  const updateFAQItem = useCallback(
    (index, field) => (e) => {
      const newEntries = [...form.faq.entries];
      newEntries[index][field] = e.target.value;
      updateForm({ path: ["faq", "entries"], value: newEntries });
    },
    [form.faq.entries, updateForm]
  );

  const removeFAQItem = useCallback(
    (index) => () => {
      const newEntries = form.faq.entries.filter((_, idx) => idx !== index);
      updateForm({
        path: ["faq", "entries"],
        value: newEntries.length ? newEntries : [{ question: "", answer: "" }],
      });
    },
    [form.faq.entries, updateForm]
  );

  // Form validation
  const validateForm = useCallback(() => {
    const { metadata, bannerData, overviewData, typesData, benefitsData, faq } =
      form;

    if (!metadata.title || !metadata.description || !metadata.pageurl) {
      return "Please fill in all metadata fields";
    }
    if (!bannerData.title || !bannerData.description || !bannerData.imageurl) {
      return "Please fill in all banner fields";
    }
    if (!overviewData) {
      return "Please provide an overview description";
    }
    if (!typesData.details) {
      return "Please provide type description";
    }
    if (typesData.images.some((img) => !img)) {
      return "Please provide all 3 service images";
    }
    if (!benefitsData.details || !benefitsData.image) {
      return "Please fill in all benefits fields";
    }
    if (faq.entries.some((entry) => !entry.question || !entry.answer)) {
      return "Please fill in all FAQ questions and answers";
    }

    return null;
  }, [form]);

  // Reset form after successful submission
  const resetForm = useCallback(() => {
    const initialForm = {
      metadata: { title: "", description: "", pageurl: "" },
      bannerData: { title: "", description: "", imageurl: "" },
      overviewData: "",
      typesData: { images: ["", "", ""], details: "" },
      benefitsData: { details: "", image: "" },
      faq: { entries: [{ question: "", answer: "" }] },
      extraFields: { detail1: "", detail2: "" },
    };

    setForm(initialForm);

    // Reset editors with proper error handling
    setTimeout(() => {
      [
        overviewEditorRef,
        typesEditorRef,
        benefitsEditorRef,
        additionalDetail1EditorRef,
        additionalDetail2EditorRef,
      ].forEach((ref) => {
        try {
          if (ref.current && typeof ref.current.setContents === "function") {
            ref.current.setContents("");
          }
        } catch (error) {
          console.warn("Error resetting editor:", error);
        }
      });
    }, 100);
  }, []);

  // Form submission
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      setServerMsg("");

      const validationError = validateForm();
      if (validationError) {
        setServerMsg(`Validation Error: ${validationError}`);
        setLoading(false);
        return;
      }

      console.log(form);

      try {
        const res = await fetch("/api/service/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json();

        setServerMsg(
          data.ok ? "Service created successfully!" : `Error: ${data.message}`
        );

        if (data.ok) {
          resetForm();
        }
      } catch (err) {
        setServerMsg(`Request failed: ${err.message}`);
      } finally {
        setLoading(false);
      }
    },
    [form, validateForm, resetForm]
  );

  // Memoized FAQ items to prevent unnecessary re-renders
  const faqItems = useMemo(() => {
    return form.faq.entries.map((entry, index) => (
      <FAQItem
        key={index}
        entry={entry}
        index={index}
        onQuestionChange={updateFAQItem(index, "question")}
        onAnswerChange={updateFAQItem(index, "answer")}
        onRemove={removeFAQItem(index)}
        canRemove={form.faq.entries.length > 1}
      />
    ));
  }, [form.faq.entries, updateFAQItem, removeFAQItem]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-8">
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
        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Metadata Section */}
          <Section
            title="Service Metadata"
            description="Basic information about your service"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <InputField
                label="Service Title"
                value={form.metadata.title}
                onChange={handleMetadataChange("title")}
                placeholder="Enter service title"
                required={true}
              />
              <InputField
                label="Description"
                value={form.metadata.description}
                onChange={handleMetadataChange("description")}
                placeholder="Brief description"
                required={true}
              />
              <div className="lg:col-span-2">
                <InputField
                  label="Page URL"
                  value={form.metadata.pageurl}
                  onChange={handleMetadataChange("pageurl")}
                  placeholder="https://example.com/service-page"
                  required={true}
                />
              </div>
            </div>
          </Section>

          {/* Banner Section */}
          <Section
            title="Banner Configuration"
            description="Set up the main banner for your service page"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <InputField
                label="Banner Title"
                value={form.bannerData.title}
                onChange={handleBannerDataChange("title")}
                placeholder="Main banner title"
                required={true}
              />
              <InputField
                label="Banner Description"
                value={form.bannerData.description}
                onChange={handleBannerDataChange("description")}
                placeholder="Banner subtitle or description"
                required={true}
              />
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Banner Image URL
                </label>
                <div>
                  <ImageUploader onUpload={handleBannerImageUpload} />
                  {form.bannerData.imageurl && (
                    <a
                      className="text-xs text-blue-500 cursor-pointer"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={form.bannerData.imageurl}
                    >
                      {" "}
                      {form.bannerData.imageurl}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Section>

          {/* Overview Section */}
          <Section
            title="Service Overview"
            description="Detailed overview of your service"
          >
            <EditorField
              label="Overview Content"
              editorRef={overviewEditorRef}
              onChange={handleOverviewChange}
              defaultValue={form.overviewData}
              editorId="overview-editor"
            />
          </Section>

          {/* Types Section */}
          <Section
            title="Service Types"
            description="Define your service type and add three representative images"
          >
            <div className="space-y-8">
              <EditorField
                label="Type Description"
                editorRef={typesEditorRef}
                onChange={handleTypesChange}
                defaultValue={form.typesData.details}
                editorId="types-editor"
              />

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Service Images (3 required)
                </h3>
                <div className="space-y-4">
                  {form.typesData.images.map((imageUrl, index) => (
                    <div key={index}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image {index + 1} URL
                      </label>
                      <div className="space-y-2">
                        <ImageUploader
                          onUpload={handleServiceImageUpload(index)}
                        />
                        {imageUrl && (
                          <a
                            className="text-xs text-blue-500 cursor-pointer"
                            target="_blank"
                            rel="noopener noreferrer"
                            href={imageUrl}
                          >
                            {imageUrl}
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          {/* Benefits Section */}
          <Section
            title="Service Benefits"
            description="Highlight the key benefits of your service"
          >
            <div className="space-y-6">
              <EditorField
                label="Benefits Description"
                editorRef={benefitsEditorRef}
                onChange={handleBenefitsChange}
                defaultValue={form.benefitsData.details}
                editorId="benefits-editor"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Benefits Image URL
                </label>
                <div className="space-y-2">
                  <ImageUploader onUpload={handleBenefitsImageUpload} />
                  {form.benefitsData.image && (
                    <a
                      className="text-xs text-blue-500 cursor-pointer"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={form.benefitsData.image}
                    >
                      {" "}
                      {form.benefitsData.image}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Section>

          {/* FAQ Section */}
          <Section
            title="Frequently Asked Questions"
            description="Add common questions and answers about your service"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  FAQ Entries
                </h3>
                <button
                  type="button"
                  onClick={addFAQItem}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  Add FAQ
                </button>
              </div>
              <div className="space-y-6">{faqItems}</div>
            </div>
          </Section>

          {/* Additional Information Section */}
          <Section
            title="Additional Information"
            description="Any additional details or custom fields"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EditorField
                label="Additional Detail 1"
                editorRef={additionalDetail1EditorRef}
                onChange={handleAdditionalDetail1Change}
                defaultValue={form.extraFields.detail1}
                editorId="detail1-editor"
              />
              <EditorField
                label="Additional Detail 2"
                editorRef={additionalDetail2EditorRef}
                onChange={handleAdditionalDetail2Change}
                defaultValue={form.extraFields.detail2}
                editorId="detail2-editor"
              />
            </div>
          </Section>

          {/* Submit Section */}
          <Section
            title="Ready to Create Service?"
            description="Review all information before submitting"
          >
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <button
                type="submit"
                disabled={loading}
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
          </Section>
        </form>
      </div>
    </div>
  );
}

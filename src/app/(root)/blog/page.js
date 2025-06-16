"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import "suneditor/dist/css/suneditor.min.css";

const SunEditor = dynamic(() => import("suneditor-react"), { ssr: false });

export default function SunTextEditor() {
  const editorRef = useRef(null);

  const handleGetContent = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContents();
      console.log("HTML Content:", content);
    } else {
      console.log("Editor not ready yet");
    }
  };

  return (
    <>
      <div className="w-full h-100 bg-red-300 p-12">
        <SunEditor
          getSunEditorInstance={(sunEditor) => {
            editorRef.current = sunEditor;
          }}
          defaultValue="Start writing..."
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
      <button onClick={handleGetContent}>Get Content</button>
    </>
  );
}

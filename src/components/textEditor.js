"use client";

import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";

const SunEditor = dynamic(() => import("suneditor-react"), { ssr: false });

export default function SunTextEditor() {
  const handleChange = (content) => {
    console.log("Content:", content);
  };

  return (
    <div className=" w-full">
      <SunEditor
      className="border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        defaultValue="Start writing..."
        onChange={handleChange}
        setOptions={{
          buttonList: [
            ["undo", "redo"],
            ["formatBlock"], // For headings like H1, H2
            ["bold", "underline", "italic"],
            ["list", "link", "image"],
            ["codeView"], // 👈 Adds HTML source editing
          ],
        }}
      />
    </div>
  );
}

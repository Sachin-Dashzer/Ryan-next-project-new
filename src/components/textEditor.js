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
        }}
      />
    </div>
  );
}

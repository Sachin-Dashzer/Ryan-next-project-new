
'use client';


import React from "react";
import ImageUploader from "@/components/admin/ImageUploader";
import AdminHeader from "@/components/admin/adminHeader";
 
const components = () => {
  const handleImageUpload = (url, publicId) => {
    console.log("Uploaded URL:", url);
    console.log("Public ID:", publicId);
  };

  return (
    <section>
      <AdminHeader title="Components" />
      <ImageUploader onUpload={handleImageUpload} />
      <h2>hello bro</h2>
    </section>
  );
};

export default components;

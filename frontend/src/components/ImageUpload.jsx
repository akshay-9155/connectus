import React from "react";

const ImageUpload = () => {
  const handleDivClick = () => {
    document.getElementById("imageInput").click();
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      console.log(files);
      // Handle the uploaded files here (e.g., display previews, upload to server, etc.)
    }
  };

  return (
    <div>
      <div
        onClick={handleDivClick}
        className="w-64 h-32 border-2 border-dashed border-pink-400 flex items-center justify-center cursor-pointer text-gray-500 hover:bg-gray-100"
      >
        Click here to upload images for your tweet
      </div>
      <input
        type="file"
        id="imageInput"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageUpload;

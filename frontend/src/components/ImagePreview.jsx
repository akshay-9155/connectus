import React, { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import ReactLoading from "react-loading";

const ImagePreview = ({
  imageSrc,
  onClose,
  onEdit,
  isProfileImageOpen,
  showLoading
}) => {
  const [image, setImage] = useState({
    profileImage: null,
    coverImage: null,
  });
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage((prevImage) => ({
      ...prevImage,
      [isProfileImageOpen ? "profileImage" : "coverImage"]: file,
    }));
  };

  const [showImageInput, setShowImageInput] = useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg relative max-w-lg w-full">
        <div className="  flex justify-end">
          <button
            className="text-red-500 font-extrabold hover:text-red-800"
            onClick={onClose}
          >
            <FaWindowClose size={36} />
          </button>
        </div>
        {showLoading ? (
          <>
            <div className="w-full flex justify-center">
              <ReactLoading
                type="spinningBubbles"
                color="#1A8CF1"
                height={"20%"}
                width={"20%"}
              />
            </div>
          </>
        ) : (
          <>
            <img
              src={imageSrc}
              alt="Preview"
              className="w-full h-auto object-contain rounded"
            />
          </>
        )}

        <div className="flex items-center mt-4 gap-4">
          <button
            className={`px-4 py-2 ${
              showImageInput
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white rounded `}
            onClick={() => setShowImageInput((prev) => !prev)}
          >
            {showImageInput ? "Cancel" : "Edit"}
          </button>
          {showImageInput && (
            <>
              <form>
                <input
                  className=" text-gray-200"
                  type="file"
                  name="image"
                  id="image"
                  onChange={handleImageChange}
                />
              </form>
              <button
                className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-800"
                onClick={() => onEdit(image)}
              >
                Submit
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;

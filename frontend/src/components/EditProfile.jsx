import axios from "axios";
import React, { useState } from "react";
import { USER_API_ENDPOINT } from "../../utils/constants";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { refreshProfile } from "../redux/features/user/userSlice";
import ReactLoading from "react-loading";

const EditProfile = ({ onClose, profileInfo }) => {
  // State to manage the form inputs
  const [name, setName] = useState(profileInfo.name || "");
  const [bio, setBio] = useState(profileInfo.bio || "");
  const [profileImage, setProfileImage] = useState(null); // Store the File object
  const [profileImagePreview, setProfileImagePreview] = useState(
    profileInfo.profileImage || ""
  ); // For image preview
  const [coverImage, setCoverImage] = useState(null); // Store the File object
  const [coverImagePreview, setCoverImagePreview] = useState(
    profileInfo.coverImage || ""
  ); // For image preview
  const [showLoading, setShowLoading] = useState(false);

  const dispatch = useDispatch();
    const { token } = useSelector((state) => state.user);


  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file); // Store the File object
      setProfileImagePreview(URL.createObjectURL(file)); // Set the preview URL
    }
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file); // Store the File object
      setCoverImagePreview(URL.createObjectURL(file)); // Set the preview URL
    }
  };

  const handleSaveProfile = async () => {
    try {
      setShowLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("bio", bio);

      if (profileImage) {
        formData.append("profileImage", profileImage); // Append profile image if it’s selected
      }

      if (coverImage) {
        formData.append("coverImage", coverImage); // Append cover image if it’s selected
      }

      const res = await axios.put(`${USER_API_ENDPOINT}/updateUser`, formData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        }, // Specify multipart content type
      });

      setShowLoading(false);

      toast.success(res?.data?.message || "Profile updated successfully!");

      dispatch(refreshProfile());
      onClose();
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong updating the profile."
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-[#1f120a] bg-opacity-50 flex items-center justify-center">
      <div className="bg-[#341e11] p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-300">Edit Profile</h2>

        {showLoading ? (
          <>
            <div className="w-full flex justify-center mb-8">
              <ReactLoading
                type="spinningBubbles"
                color="#E9804D"
                height={"20%"}
                width={"20%"}
              />
            </div>
          </>
        ) : (
          <>
            {/* Profile Image */}
            <div className="mb-4">
              <label className=" text-[#f0c29e]">Profile Image</label>
              <input
                type="file"
                accept="image/*"
                className=" mt-2 ml-4 "
                onChange={handleProfileImageChange}
              />
              {profileImagePreview && (
                <img
                  src={profileImagePreview}
                  alt="Profile Preview"
                  className="mt-4 w-24 h-24 rounded-full object-cover"
                />
              )}
            </div>

            {/* Cover Image */}
            <div className="mb-4">
              <label className=" text-[#f0c29e]">Cover Image</label>
              <input
                type="file"
                accept="image/*"
                className=" mt-2 ml-4 "
                onChange={handleCoverImageChange}
              />
              {coverImagePreview && (
                <img
                  src={coverImagePreview}
                  alt="Cover Preview"
                  className="mt-4 w-full h-32 object-cover rounded-lg"
                />
              )}
            </div>

            {/* Name */}
            <div className="mb-4">
              <label className="block text-[#f0c29e]">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 bg-transparent border rounded-lg focus:outline-none "
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Bio */}
            <div className="mb-4">
              <label className="block text-[#f0c29e]">Bio</label>
              <textarea
                className="w-full px-4 py-2 mt-2 bg-transparent border rounded-lg focus:outline-none "
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows="3"
              />
            </div>
          </>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
            onClick={handleSaveProfile}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

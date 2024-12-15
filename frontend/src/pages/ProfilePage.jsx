import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Camera, User, Mail } from "lucide-react";
import toast from "react-hot-toast"; 

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const [activeTab, setActiveTab] = useState("profile");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check if the file size is greater than 50KB
    if (file.size > 50 * 1024) {
      toast.error("File size exceeds 50KB. Please upload a smaller image.");
      return; 
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen flex justify-center bg-gray-900 text-white overflow-hidden">
      <div className="w-full max-w-3xl space-y-8 overflow-y-auto pt-6">
        <div className="text-center pt-16">
          <h1 className="text-2xl font-semibold">Profile</h1>
          <p className="text-sm text-gray-400">Your profile information</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center space-x-4 border-b border-gray-700">
          <button
            className={`pb-2 px-4 ${
              activeTab === "profile"
                ? "border-b-2 border-primary text-white"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Personal Info
          </button>
          <button
            className={`pb-2 px-4 ${
              activeTab === "account"
                ? "border-b-2 border-primary text-white"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("account")}
          >
            Account Info
          </button>
        </div>

<div className="bg-gray-800 rounded-xl p-5 space-y-6 max-w-lg mx-auto">
  {/* Profile Tab */}
  {activeTab === "profile" && (
    <div>
      <div className="flex flex-col items-center gap-2">
        <div className="relative">
          <img
            src={
              selectedImg ||
              authUser.profilePic ||
              "./src/assets/avatar.png"
            }
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-700"
          />
          <label
            htmlFor="avatar-upload"
            className={`absolute bottom-0 right-0 bg-primary p-2 rounded-full cursor-pointer transition-all duration-200 ${
              isUpdatingProfile
                ? "animate-pulse pointer-events-none"
                : ""
            }`}
          >
            <Camera className="w-5 h-5 text-gray-200" />
            <input
              type="file"
              id="avatar-upload"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isUpdatingProfile}
            />
          </label>
        </div>
        <p className="text-sm text-gray-400">
          {isUpdatingProfile
            ? "Uploading ..."
            : "Click to update your photo"}
        </p>
        {/* Display file size limit */}
        <p className="text-xs text-gray-400 mt-2">Max size: 50KB</p>
      </div>

      <div className="space-y-4 mt-4">
        <div>
          <div className="flex items-center gap-2 py-2 text-gray-400">
            <User className="w-5 h-5" />
            <span>Full Name</span>
          </div>
          <p className="px-4 py-2 bg-gray-700 rounded-lg">
            {authUser?.fullName}
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2 py-2 text-gray-400">
            <Mail className="w-5 h-5" />
            <span>Email Address</span>
          </div>
          <p className="px-4 py-2 bg-gray-700 rounded-lg">
            {authUser?.email}
          </p>
        </div>
      </div>
    </div>
  )}

  {/* Account Info Tab */}
  {activeTab === "account" && (
    <div>
      <h2 className="text-xl font-medium mb-4">Account Information</h2>
      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between py-1 border-gray-700">
          <span>Member Since</span>
          <span className="text-gray-400 text-sm">2024-06-12</span>{" "}
        </div>
        <hr className="opacity-30" />

        {/* Account Status */}
        <div className="flex items-center justify-between py-1">
          <span>Account Status</span>
          <div className="flex items-center gap-2">
            <span className="text-green-500">Active</span>
          </div>
        </div>
      </div>
    </div>
  )}
</div>

      </div>
    </div>
  );
};

export default ProfilePage;

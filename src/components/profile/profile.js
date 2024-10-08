import React, { useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { updateProfile, updatePassword } from "firebase/auth"; // Import updatePassword
import Notiflix from "notiflix"; // Optional: For notifications
import {
  doPasswordChange,
  doUpdateEmail,
  doUpdateProfile,
} from "../../firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import Firebase Storage
import { auth } from "../../firebase/firebase";
import { PulseLoader } from "react-spinners";
import { PencilLine, Pencil } from "lucide-react";
const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    displayName: auth.currentUser.displayName || "",
    email: auth.currentUser.email || "",
    newPassword: "", // State for new password
  });
  const [file, setFile] = useState(null); // State for file input
  const [previewURL, setPreviewURL] = useState(""); // State for preview URL
  const fileInputRef = React.useRef(null); // Ref to trigger file input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Create a preview URL for the selected file
    if (selectedFile) {
      const fileURL = URL.createObjectURL(selectedFile);
      setPreviewURL(fileURL);
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
  const handleProfilePicClick = () => {
    if (isEditing) {
      fileInputRef.current.click(); // Trigger file input click
    }
  };

  const handleSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    console.log(auth.currentUser, "auth.currentUser");

    try {
      // Update user profile in Firebase Auth
      if (file) {
        const storage = getStorage();
        const storageRef = ref(
          storage,
          `profilePictures/${auth.currentUser.uid}`
        );

        // Upload file
        await uploadBytes(storageRef, file);

        // Get the download URL
        const downloadURL = await getDownloadURL(storageRef);

        // Update the user profile with the new photo URL
        await updateProfile(auth.currentUser, {
          displayName: formData.displayName,
          photoURL: downloadURL, // Update photoURL with the new download URL
        });
      } else {
        // Update only the display name if no file is selected
        await doUpdateProfile({
          displayName: formData.displayName,
          photoURL: auth.currentUser.photoURL,
        });
      }

      // Update email if provided
      if (formData.email !== auth.currentUser.email) {
        await doUpdateEmail(formData.email);
      }

      // Update password if provided
      if (formData.newPassword) {
        await doPasswordChange(formData.newPassword);
      }

      Notiflix.Notify.success("Profile updated successfully!");
      toggleEdit(); // Exit edit mode after saving
    } catch (error) {
      console.error("Error updating profile: ", error);
      Notiflix.Notify.failure("Error updating profile: " + error.message);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="max-w-xl w-full mx-auto p-6 bg-white bg-opacity-70 rounded-lg shadow-card">
      <h2 className="text-2xl font-bold text-center mb-8 text-blue-600">
        User Profile
      </h2>

      <div className="flex justify-center mb-4">
        <div className="relative inline-block">
          <img
            src={
              previewURL ||
              auth.currentUser.photoURL ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLMI5YxZE03Vnj-s-sth2_JxlPd30Zy7yEGg&s"
            }
            alt="Profile"
            className={`rounded-full w-24 h-24 object-cover cursor-pointer ${
              isEditing
                ? "border-2 border-blue-600"
                : "border-2 border-transparent"
            }`}
            onClick={handleProfilePicClick}
          />

          {isEditing && (
            <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md">
              <PencilLine
                className="text-blue-600 cursor-pointer"
                onClick={handleProfilePicClick}
              />
            </div>
          )}
        </div>
        {isEditing && (
          <button
            type="button"
            className="absolute top-0 right-0 bg-blue-600 text-white p-1 rounded-full text-xs"
            onClick={handleProfilePicClick}
          >
            Edit
          </button>
        )}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
          accept="image/*"
        />
      </div>

      <div onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="displayName">
            Display Name
          </label>
          <input
            type="text"
            id="displayName"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
            disabled={!isEditing}
            className={`border border-gray-300 p-2 rounded-md w-full ${
              !isEditing ? "bg-gray-100" : ""
            }`}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!isEditing}
            className={`border border-gray-300 p-2 rounded-md w-full ${
              !isEditing ? "bg-gray-100" : ""
            }`}
            required
          />
        </div>

        {/* New Password Field */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="newPassword">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            disabled={!isEditing}
            className={`border border-gray-300 p-2 rounded-md w-full ${
              !isEditing ? "bg-gray-100" : ""
            }`}
            placeholder="Leave blank to keep current password"
          />
        </div>

        <div className="flex justify-center">
          {isEditing ? (
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-600 text-white py-2 px-8 rounded-md shadow-md hover:bg-blue-700 transition mx-2"
            >
              {loader ? <PulseLoader size={10} color="white" /> : "Submit"}
            </button>
          ) : (
            <button
              type="button"
              onClick={toggleEdit}
              className= "flex items-center gap-2 bg-blue-600 text-white py-2 px-8 rounded-md shadow-md hover:bg-blue-700 transition mx-2"
            >
              <Pencil size={16}/> Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

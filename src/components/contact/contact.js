import React, { useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { db } from "../../firebase/firebase";
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions
import Notiflix from "notiflix";
import { PuffLoader, PulseLoader } from "react-spinners";
import { countries } from "../../utils/countries";

const Contact = () => {
  const { currentUser } = useAuth();
  const [loader, setLoader] = useState(false);
  // State to manage form inputs
  const [formData, setFormData] = useState({
    country: "",
    phoneNumber: "",
    email: "",
    contactType: "office", // Default value
  });
  const [errors, setErrors] = useState({
    phoneNumber: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      const phoneNumberPattern = /^[0-9]*$/; // Only digits allowed

      // Validate length and pattern
      if (value.length > 10) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phoneNumber: "Phone number must be 10 digits max.",
        }));
      } else if (!phoneNumberPattern.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phoneNumber: "Phone number must contain only digits.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phoneNumber: "", // Clear error if valid
        }));
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    setLoader(true);
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Add the form data to the Firestore collection
      await addDoc(collection(db, "contacts"), formData);
      Notiflix.Report.success(
        "Contact Submitted!",
        "You can find the updated DB in the Users tab!"
      );
      // Optionally reset the form after submission
      setFormData({
        country: "",
        phoneNumber: "",
        email: "",
        contactType: "office",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      Notiflix.Notify.failure(
        "Oops, something went wrong!",
        "Please contact the developer at siddharthsarkar200@gmail.com"
      );
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="max-w-xl w-full mx-auto p-6 bg-white bg-opacity-70 rounded-lg shadow-card">
      <h2 className="text-2xl font-bold text-center mb-8 text-blue-600">
        Please submit your contact details.
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="country">
            Country
          </label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md w-full"
            required
          >
            <option value="" disabled>
              Select your country
            </option>
            {countries.map((item) => (
              <option key={item.code} value={item.name}>
                {item.name}
              </option>
            ))}
            {/* Add more countries as needed */}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="phoneNumber">
            Phone Number
          </label>
          <input
            type="number" // Change to text for custom validation
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={`border border-gray-300 p-2 rounded-md w-full ${
              errors.phoneNumber ? "border-red-500" : ""
            }`}
            placeholder="Enter your phone number"
            required
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
          )}
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
            className="border border-gray-300 p-2 rounded-md w-full"
            placeholder="Enter your email address"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Contact Type</label>
          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                name="contactType"
                value="office"
                checked={formData.contactType === "office"}
                onChange={handleChange}
                className="mr-2"
              />
              Office
            </label>
            <label>
              <input
                type="radio"
                name="contactType"
                value="home"
                checked={formData.contactType === "home"}
                onChange={handleChange}
                className="mr-2"
              />
              Home
            </label>
          </div>
        </div>

        <div className="w-full flex">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-8 rounded-md shadow-md hover:bg-blue-700 transition mx-auto w-50"
          >
            {loader ? <PulseLoader size={10} color="white" /> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;

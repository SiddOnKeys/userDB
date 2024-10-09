import React, { useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { db } from "../../firebase/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; // Import Firestore functions
import Notiflix from "notiflix";
import { PuffLoader, PulseLoader } from "react-spinners";
import { countries } from "../../utils/countries";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../shadCn/components/card";
import { Button } from "../../shadCn/components/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../shadCn/components/select";
import { Input } from "../../shadCn/components/input";
import { RadioGroupItem, RadioGroup } from "../../shadCn/components/radio";

const Contact = () => {
  const { currentUser } = useAuth();
  const [loader, setLoader] = useState(false);




  // State to manage form inputs
  const [formData, setFormData] = useState({
    name: currentUser.displayName || "",
    country: "",
    phoneNumber: currentUser.phoneNumber || null,
    email: currentUser.email || "",
    contactType: "office",
    createdAt: serverTimestamp(),
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
    e.preventDefault(); // Prevent default form submission behavior
    if (formData.country === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        country: "Please select your country",
      }));
      return;
    }
    setLoader(true);
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
    <Card className="max-w-xl w-full mx-auto p-6">
      <CardHeader>
        <CardTitle>
          <h3 className="text-lg">Please submit your contact details.</h3>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block  mb-1" htmlFor="email">
              Name
            </label>
            <Input
              type="name"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className=" w-full"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block  mb-1" htmlFor="country">
              Country
            </label>
            <Select
              value={formData.country}
              onValueChange={(value) => {
                setFormData({ ...formData, country: value });
                setErrors((prev) => ({ ...prev, country: false }));
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Countries</SelectLabel>
                  {countries.map((item) => (
                    <SelectItem key={item.code} value={item.name}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.country && !formData.country && (
              <p className="text-red-500 text-sm mt-1">{errors.country}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block  mb-1" htmlFor="phoneNumber">
              Phone Number
            </label>
            <Input
              type="number" // Changed to tel for better mobile compatibility
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={` w-full ${
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
            <label className="block  mb-1" htmlFor="email">
              Email
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className=" w-full"
              placeholder="Enter your email address"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block  mb-2">Contact Type</label>
            <RadioGroup
              value={formData.contactType}
              className="flex flex-row-reverse space-y-1 items-start justify-end gap-4"
              onValueChange={(value) =>
                setFormData({ ...formData, contactType: value })
              }
            >
              <div className="flex flex-col gap-4">
                {" "}
                <p>Office</p>
                <p>Home</p>
              </div>
              <div className="flex flex-col gap-5 ">
                <RadioGroupItem
                  value="office"
                  id="contact-type-office"
                  className="flex items-center h6 w6"
                >
                  <input type="radio" className="hidden" />
                  <label htmlFor="contact-type-office" className="ml-2">
                    Office
                  </label>
                </RadioGroupItem>
                <RadioGroupItem
                  value="home"
                  id="contact-type-home"
                  className="flex items-center"
                >
                  <input type="radio" className="hidden" />
                  <label htmlFor="contact-type-home" className="ml-2">
                    Home
                  </label>
                </RadioGroupItem>
              </div>
            </RadioGroup>
          </div>

          <div className="w-full flex">
            <Button type="submit" size={"lg"} className="mx-auto">
              {loader ? <PulseLoader size={10} color="white" /> : "Submit"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Contact;

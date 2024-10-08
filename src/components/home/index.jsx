import React from "react";
import { useAuth } from "../../contexts/authContext";

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <div
      className="flex flex-col justify-center items-center  text-blue-900 bg-cover bg-center"
      style={{ backgroundImage: `url('/path-to-your-image.png')` }} // Replace this with the actual image path
    >
      <div className="bg-white bg-opacity-70 p-16 rounded-md shadow-card">
        <h1 className="text-5xl font-bold text-center mb-8 text-blue-600">
          Welcome.
        </h1>
        <p className="text-2xl text-center mb-6">
          Hello{" "}
          {currentUser.displayName
            ? currentUser.displayName
            : currentUser.email}
          , you are now logged in.
        </p>
        <div className="mt-10">
          <p className="text-lg text-center text-gray-700">
            UserDB keeps track of all registered users, allowing you to access
            user information and history seamlessly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;

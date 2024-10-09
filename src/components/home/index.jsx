import React from "react";
import { useAuth } from "../../contexts/authContext";
import { Card } from "../../../src/shadCn/components/card";

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <div
      className="flex flex-col justify-center items-center w-full text-primary-900 bg-cover bg-center"
      style={{ backgroundImage: `url('/path-to-your-image.png')` }}
    >
      <Card>
        <div className=" bg-opacity-70 p-16 rounded-md shadow-card">
          <h1 className="text-5xl text-neutral-50  text-center mb-8">
            Welcome to <span className="font-bold  text-primary">UserDB.</span>
          </h1>
          <p className="text-2xl text-center mb-6">
            Hello{" "}
            {currentUser.displayName
              ? currentUser.displayName
              : currentUser.email}
            , you are now logged in.
          </p>
          <div className="mt-10">
            <p className="text-lg text-center text-gray-400">
              UserDB keeps track of all registered users, allowing you to access
              user information and history seamlessly.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Home;

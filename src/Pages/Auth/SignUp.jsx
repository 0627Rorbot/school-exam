import { Link, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";

export default function SignUp() {
  const auth = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleChangeUsername = (e) => {
    e.preventDefault(); // prevent the default action
    setUsername(e.target.value); // set name to e.target.value (event)
  };

  const handleChangeEmail = (e) => {
    e.preventDefault(); // prevent the default action
    setEmail(e.target.value); // set name to e.target.value (event)
  };

  const handleChangePassword = (e) => {
    e.preventDefault(); // prevent the default action
    setPassword(e.target.value); // set name to e.target.value (event)
  };

  const tryRegister = async (e) => {
    e.preventDefault();
    if (
      username.trim() === "" ||
      email.trim() === "" ||
      password.trim() === ""
    ) {
      showToast(false, "Error!", "User information is incorrect.");
      return;
    }

    try {
      const response = await auth.register(username, email, password);
      if (response.status === true) {
        showToast(true, "Success", response.message);
        navigate("/signin");
      } else showToast(false, "Error!", response.message);
    } catch (error) {
      showToast(false, "Error!", `${error.response.data.message}`);
    }
  };

  const showToast = (isSuccess, title, content) => {
    const status = isSuccess ? "success" : "error";
    toast({
      title: title,
      description: content,
      status: status,
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <form onSubmit={tryRegister}>
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-15">
              <h2 className="h2">
                Welcome <br />
                Skool Simulator.
              </h2>
            </div>
            <div className="max-w-sm mx-auto">
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-300 text-lg font-medium mb-1"
                    htmlFor="full-name"
                  >
                    Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="full-name"
                    type="text"
                    className="form-input w-full text-gray-300"
                    placeholder="First and last name"
                    required
                    onChange={handleChangeUsername}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-300 text-lg font-medium mb-1"
                    htmlFor="email"
                  >
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="form-input w-full text-gray-300"
                    placeholder="you@yourcompany.com"
                    required
                    onChange={handleChangeEmail}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-300 text-lg font-medium mb-1"
                    htmlFor="password"
                  >
                    Password <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="form-input w-full text-gray-300"
                    placeholder="Password (at least 10 characters)"
                    required
                    onChange={handleChangePassword}
                  />
                </div>
              </div>
              <div className="text-sm text-gray-500 text-center">
                I agree to use skool exam simulator.
              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  <button className="btn text-white bg-purple-600 hover:bg-purple-700 w-full">
                    Sign up
                  </button>
                </div>
              </div>
              <div className="text-gray-400 text-center mt-6">
                Already using Open PRO?{" "}
                <Link
                  href="/signin"
                  className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
// import Register from "./Pages/Auth/Register";
// import Login from "./Pages/Auth/Login";
import SignIn from "./Pages/Auth/SignIn";
import SignUp from "./Pages/Auth/SignUp";
import Problem from "./Pages/Admin/Problem";
import NotFound from "./libs/NotFound";
import Test from "./Pages/Exam/Test";
import Test_Home from "./Pages/Exam/Test/Test_Home";
import Test_Main from "./Pages/Exam/Test/Test_Main";
import Header from "./Components/Layout/header";
import "./css/style.css";

import AOS from "aos";
import "aos/dist/aos.css";

import PageIllustration from "./Components/page-illustration";
import Footer from "./Components/Layout/footer";

const App = () => {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 600,
      easing: "ease-out-sine",
    });
  });

  return (
    <div
      className={`font-inter antialiased bg-gray-900 text-gray-200 tracking-tight`}
    >
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Header />
        <PageIllustration />
        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/problem" element={<Problem />} />
            <Route path="/test" element={<Test />} />
            <Route path="/test/home" element={<Test_Home />} />
            <Route path="/test/main" element={<Test_Main />} />
            <Route component={NotFound} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;

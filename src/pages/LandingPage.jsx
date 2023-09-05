import React from "react";
import Header from "../components/Header";
import Context from "../components/Context";

const LandingPage = () => {
  return (
    <>
      <div className="container border border-4  p-4 m-4 rounded-5">
        <Header />
        <Context />
      </div>
    </>
  );
};

export default LandingPage;

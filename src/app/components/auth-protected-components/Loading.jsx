import React from "react";
import { ClipLoader } from "react-spinners";

const LoadingUI = () => {
  return (
    <div className="main-tranisiton page-transition-off">
      <ClipLoader size={36} />
    </div>
  );
};

export default LoadingUI;

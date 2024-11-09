import React from "react";

const CommonLayoutForAdminAndUser = ({ children }) => {
  return (
    <div>
      <h1>Navbar</h1>
      {children}
      <h1>Footer</h1>
    </div>
  );
};

export default CommonLayoutForAdminAndUser;

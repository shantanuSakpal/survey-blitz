import React from "react";

const IsRequiredToggle = () => {
  return (
    <>
      <p>Required</p>
      <label className="toggle-switch">
        <input type="checkbox" />
        <div className="toggle-switch-background">
          <div className="toggle-switch-handle"></div>
        </div>
      </label>
    </>
  );
};

export default IsRequiredToggle;

import React from "react";

function FormDisplay({ formComponentsObj }) {
  return (
    <div className="column middle-column-container">
      <div>
        {formComponentsObj && (
          <ul>
            {Object.values(formComponentsObj).map((value, index) => (
              <li key={index}>{value}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default FormDisplay;

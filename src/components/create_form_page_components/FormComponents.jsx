import React, { useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AddInput from "./AddInput";
import CancelIcon from "@mui/icons-material/Cancel";
import { ComponentTreeItem } from "./ComponentTreeItem";

function FormComponents({
  addClickedComponent,
  formComponentsObj,
  removeClickedComponent,
}) {
  const [addInputVisible, setAddInputVisible] = useState(false);

  return (
    <>
      <div className=" column left-column-container">
        <AddInput addClickedComponent={addClickedComponent} />

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            borderBottom: "1px solid gray",
          }}
        >
          <h3>Components</h3>
          <div
            onClick={() => {
              var el = document.getElementById("addInput");
              el.classList.toggle("hide");
              setAddInputVisible(!addInputVisible);
              console.log("clicked");
            }}
            style={{ padding: "10px" }}
          >
            {addInputVisible ? (
              <CancelIcon
                sx={{
                  display: "inline",

                  ":hover": { cursor: "pointer" },
                }}
                fontSize="medium"
              />
            ) : (
              <AddBoxIcon
                sx={{
                  display: "inline",

                  ":hover": { cursor: "pointer" },
                }}
                fontSize="medium"
              />
            )}
          </div>
        </div>

        {formComponentsObj && (
          <div className="form-components-container">
            {Object.entries(formComponentsObj).map(([key, value]) => (
              <ComponentTreeItem
                name={value}
                date={key}
                removeClickedComponent={removeClickedComponent}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default FormComponents;

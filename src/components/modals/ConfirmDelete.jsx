import * as React from "react";

export default function ConfirmDelete({
  open,
  handleClose,
  section_id,
  removeSection,
}) {
  return (
    open && (
      <div
        style={{
          // position: "absolute",
          top: "50%",
          left: "0%",
          backgroundColor: "white",
          color: "black",
          width: "100px",
        }}
      >
        are you sure you want to delete?
        <button onClick={removeSection(section_id)}>yes</button>
        <button onClick={handleClose}>no</button>
      </div>
    )
  );
}

import React, { useContext, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import UserContext from "../../context/UserContext";
import { NewFormModal } from "../modals/NewFormModal";
import { createPortal } from "react-dom";

function CreateFormButton() {
  const { user, setUser } = useContext(UserContext);

  const [modalOpen, setModalOpen] = useState(false);

  const handleAddForm = async (e) => {
    e.stopPropagation();
    const currUser = JSON.parse(localStorage.getItem("currUser"));
    setUser(currUser);
    setModalOpen(true);
  };

  return (
    <div className="form-card-container" onClick={(e) => handleAddForm(e)}>
      <div className="inner-container">
        <div className="icon">
          <AddIcon />
        </div>
        <div className="form-name">New Form</div>
      </div>
      {modalOpen &&
        createPortal(
          <NewFormModal setModalOpen={setModalOpen} />,

          document.body
        )}
    </div>
  );
}

export default CreateFormButton;

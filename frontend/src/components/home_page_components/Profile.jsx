import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function Profile({ setModalOpen, username }) {
  return (
    <div
      className="profile"
      onClick={() => {
        setModalOpen(true);
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <div className="account-icon">
          <AccountCircleIcon />
        </div>
        <div className="username">{username}</div>
      </div>
      <div className="icon">
        <MoreVertIcon />
      </div>
    </div>
  );
}

export default Profile;

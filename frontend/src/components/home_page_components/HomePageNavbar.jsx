import React, { useEffect, useState } from "react";

import FeedIcon from "@mui/icons-material/Feed";
import AccountSettings from "../modals/AccountSettings";
import AppLogo from "../brand_logo/AppLogo";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";

function HomePageNavbar({ username, forms, page }) {
  const count = 5;

  //path is the current url after first slash and before second slash
  const path = window.location.pathname.split("/").slice(1, 2)[0];
  const currpageurllastword = window.location.pathname.split("/").slice(-1)[0];
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    forms && (
      <>
        <div className="brand-logo-container">
          <AppLogo />
        </div>
        <div className="links-container">
          <div
            onClick={() => navigate("/home")}
            className={`link ${path === "home" ? "selected" : ""}`}
          >
            <FeedIcon fontSize="smaller" />
            <p>Home</p>
            <span>{count}</span>
          </div>

          {forms.length > 0 && (
            <div
              onClick={() => navigate(`/analytics/${forms[0].form_id}`)}
              className={`link ${path === "analytics" ? "selected" : ""}`}
            >
              <FeedIcon fontSize="smaller" />
              <p>Analytics</p>
              <span>{count}</span>
            </div>
          )}
          <div
            onClick={() => navigate("/billings")}
            className={`link ${path === "billings" ? "selected" : ""}`}
          >
            <FeedIcon fontSize="smaller" />
            <p>Billing</p>
            <span>{count}</span>
          </div>
        </div>

        {page === "analytics" ? (
          <div className="links-container">
            <h5>Forms</h5>
            {forms?.length > 0 &&
              forms.map(
                (form) =>
                  !form.deleted && (
                    <div
                      key={form.form_id}
                      className={`link ${
                        currpageurllastword === form.form_id ? "selected" : ""
                      }`}
                      onClick={() => navigate(`/analytics/${form.form_id}`)}
                    >
                      <FeedIcon fontSize="smaller" />
                      <p>{form.formObject.form_name}</p>
                    </div>
                  )
              )}
          </div>
        ) : null}

        <Profile setModalOpen={setModalOpen} username={username} />

        {modalOpen && <AccountSettings setModalOpen={setModalOpen} />}
      </>
    )
  );
}

export default HomePageNavbar;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import QRCode from "react-qr-code";

function ShareFormModal({ setIsShareModalOpen }) {
  const formObject = useSelector((state) => state.formObject);
  const [copied, setCopied] = useState(false);
  const [formUrl, setFormUrl] = useState("");

  const handleCopyUrl = async (e) => {
    e.preventDefault();

    try {
      await navigator.clipboard.writeText(formObject.form_url);
      setCopied(true);
    } catch (error) {
      console.error("Error copying URL:", error);
    }
  };

  useEffect(() => {
    const url = formObject.form_url;
    const urlArray = url.split("/");
    const actualUrl = urlArray[urlArray.length - 1];
    setFormUrl(actualUrl);
    document.getElementById("form_url_start").innerText =
      urlArray[2] + "/" + urlArray[3] + "/";
  }, [formObject]);

  return (
    <div
      className="share-form-modal-container"
      onClick={(e) => {
        e.stopPropagation(); // Stop propagation of the click event
        if (e.target.className === "share-form-modal-container")
          setIsShareModalOpen();
      }}
    >
      <form>
        <div className="modal">
          <div className="close" onClick={() => setIsShareModalOpen()}>
            &times;
          </div>

          <div className="modal-content">
            <div className="qr-code-container">
              <QRCode
                className="qr-code"
                bgColor="aliceblue"
                fgColor="black"
                value={formObject.form_url}
              />
            </div>
            <div className="modal-header">
              <div>
                <h1>{formObject.form_name}</h1>
                <div id="form_url_start">example.com/</div>
                <div className="form-url">{formUrl}</div>
              </div>

              <button
                className="copy-url-btn"
                onClick={(e) => {
                  handleCopyUrl(e);
                }}
              >
                {copied ? "Copied!" : "Copy link"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ShareFormModal;

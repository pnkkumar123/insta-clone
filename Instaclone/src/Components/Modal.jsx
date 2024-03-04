import React from "react";
import { RiCloseLine } from "react-icons/ri";
import "./Modal.css";
import { useNavigate } from "react-router-dom";

export default function Modal({ setModelOpen }) {
  const navigate = useNavigate();
  return (
    <div className="darkBg" onClick={() => setModelOpen(false)}>
      <div className="centered">
        <div className="modal">
          {/* modal header */}
          <div className="modalHeader">
            <h5 className="heading">Confirm</h5>
          </div>
          <button className="closeBtn" onClick={() => setModelOpen(false)}>
            <RiCloseLine></RiCloseLine>
          </button>
          {/* modal content */}
          <div className="modalContent">Are you really want to log Out ?</div>
          <div className="modalActions">
            <div className="actionsContainer">
              <button
                className="logOutBtn"
                onClick={() => {
                  setModelOpen(false);
                  localStorage.clear();
                  navigate("./signin");
                }}
              >
                Log Out
              </button>

              <button className="cancelBtn" onClick={() => setModelOpen(false)}>
                cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
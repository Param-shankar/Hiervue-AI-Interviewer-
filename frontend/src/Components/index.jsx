import React from "react";
import logo from "../assets/logo.jpeg"; // Import your logo image
import "../Components/style.css";
import axios from "axios";
import { Link } from "react-router-dom";

function InterviewScheduler() {
  const handlesubmit = async () => {
    const data = await axios.post("/api/resume");
  };

  return (
    <div>
      <nav>
        <div>
          <div className="logo">
            {" "}
            <img
              src={logo}
              alt="logo image"
              style={{ width: "65px", height: "65px" }}
            />
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <div className="dropdown">
            <button
              className="dropbtn"
              style={{ display: "flex", alignItems: "center" }}
            >
              Language
            </button>
            <div className="dropdown-content">
              <a href="#">English</a>
              <a href="#">हिन्दी</a>
              {/* Add more language options as needed */}
            </div>
          </div>
          <button className="btn-red-sm" onClick={() => languagepage()}>
            sign in
          </button>
        </div>
      </nav>
      <div
        style={{
          backgroundColor: "rgba(159, 159, 159, 0.826)",
          height: "3px",
          width: "100%",
        }}
      ></div>
      <br />
      <br />
      <br />
      <div className="container">
        <h1>Interview Scheduler</h1>
        <form method="post" onSubmit={handlesubmit}>
          <label htmlFor="name">Full Name:</label>
          <input type="text" id="name" name="name" required />
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
          <label htmlFor="resume">Upload Resume:</label>
          <input
            type="file"
            id="resume"
            name="resume"
            accept=".pdf,.doc, .docx ,.txt,.png ,.jepg"
            required
          />{" "}
          <br />
          <br />
          <Link to={"interview"}> 
            <input
              type="submit"
              className="btn btn-red"
              onClick={() => languagepage()}
              value="Schedule Interview"
            />
          </Link>
        </form>
      </div>
    </div>
  );
}

function languagepage() {}

export default InterviewScheduler;

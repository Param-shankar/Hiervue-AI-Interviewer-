import React, { useEffect, useState } from "react";
import "../Components/style1.css";
import Designer from "../assets/Designer.png";
import axios from "axios";

function ChatContainer() {
  const [que, setque] = useState([
    "Do you have good time management skills?",
    "Do you believe in working hard or working smarter?",
    "Would you call yourself an organized person?",
  ]);
  const [id, setid] = useState(null);
  const [videourl, setvideourl] = useState(
    "https://res.cloudinary.com/darkybkfp/video/upload/v1713654125/h1yv85s43fgsmelxukbk.mp4"
  );
  const [nextvideourl, setnextvideourl] = useState("");
  const [currentque, setcurrentque] = useState(-1);
  const [button, setbutton] = useState(false);

  const handclear = () => {
    setque([]);
  };
  const fetchque = async () => {
    const ques = await axios.get("api/google");
    //  console.log(ques.data);
    const q = ques.data.split("\n");
    setque([que, ...q]);
    console.log("fetching que");
  };

  const fetchavatar = async (statement) => {
    const payload = {
      input_face:
        "https://res.cloudinary.com/darkybkfp/video/upload/v1713654125/h1yv85s43fgsmelxukbk.mp4",
      text_prompt: statement,
      tts_provider: "GOOGLE_TTS",
    };
    async function gooeyAPI() {
      const response = await fetch("https://api.gooey.ai/v2/LipsyncTTS/", {
        method: "POST",
        headers: {
          Authorization:
            "Bearer " + "sk-Vc7E8pFv1piitDmmYvtuJgZlFsqPkDRc0u3zQ7QzLB99jm29",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(response.status);
      }
      const result = await response.json();
      console.log(response.status, result);
      setvideourl(result.output.output_video);
    }

    gooeyAPI();
  };

  useEffect(() => {
    if (currentque == -1) {
      console.log("the value is -1 ");
    } else {
      console.log(videourl);
      console.log(nextvideourl);
      fetchavatar(que[currentque]);
    }
  }, [currentque]);

  const startinteview = () => {
    setbutton(!button);
    fetchavatar("Are you ready for interview ?");
    if (currentque == -1) {
      setcurrentque(0);
    }
  };

  useEffect(() => {
    fetchque();
  }, []);

  const handlenext = () => {
    console.log(currentque);
    if (currentque >= 7) {
      console.log("no more que");
    } else {
      setcurrentque(() => currentque + 1);
    }
  };
  return (
    <div id="chat-container">
      <div id="left-chat">
        <div className="nav">
          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ width: "25px" }}> </div>
            <div style={{ fontSize: "larger", fontWeight: 700 }}>Chats</div>
            <div>
              <i className="bx bxs-chat" style={{ fontSize: "22px" }}></i>
            </div>
            <div>
              <i className="bx bx-pin" style={{ fontSize: "22px" }}></i>
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <div>
              <i className="bx bx-trash-alt" style={{ fontSize: "22px" }}></i>
            </div>
            <button
              style={{
                fontSize: "larger",
                fontWeight: 700,
                background: "transparent",
                color: "white",
                borderRadius: "4px",
                border: "2px solid white",
              }}
              onClick={handclear}
            >
              Clear All
            </button>
            <div style={{ width: "25px" }}> </div>
          </div>
        </div>
        <br />
        <div className="message-left ai-message">
          <p>This is an AI message.</p>
        </div>
        <div className="message-left employee-message">
          <p>This is an employee message.</p>
          {que.map((val) => {
            // console.log(val.slice(3,val.length));

            return <p>{val.slice(3, val.length)}</p>;
          })}
        </div>
      </div>
      <div id="right-chat">
        <div id="ai-chat">
          <div className="message">
            <video
              src={videourl}
              autoPlay={true}
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
            />
            <p>This is an AI message.</p>
          </div>
        </div>
        <div>
          <button onClick={startinteview}>
            {button ? "running the interview" : "Start Interview"}
          </button>
          <button onClick={handlenext}>next que</button>
        </div>
        <div id="employee-chat">
          <div className="message">
            <img id="employee-avatar" src={Designer} alt="Employee Avatar" />
            <p>This is an employee message.</p>
            {/* {que.map((val)=>{
              // console.log(val.slice(3,val.length));
              return <p>{val.slice(3, val.length)}</p>;
            })} */}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ChatContainer;

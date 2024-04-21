import React, { useEffect, useState } from "react";
import "../Components/style1.css";
import Designer from "../assets/Designer.png";
import axios from "axios";
import BarLoader from "react-spinners/BarLoader";
import Dictaphone1 from "./Dict";

const Aichat = ({ val }) => {
  return (
    <div
      className="message-left ai-message"
      style={{
        display: "flex",
        height: "90%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p>{val}</p>
    </div>
  );
};

const Mytext = ({ message }) => {
  return (
    <div
      className="message-left employee-message"
      style={{
        display: "flex",
        height: "3vh",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p>{message}</p>
    </div>
  );
};

function ChatContainer() {
  const [que, setque] = useState([
    "8 .Do you have good time management skills?",
    "9 .Do you believe in working hard or working smarter?",
    "10.Would you call yourself an organized person?",
  ]);
  const [aimsg, setaimsg] = useState([]);
  const [videourl, setvideourl] = useState(
    "https://res.cloudinary.com/darkybkfp/video/upload/v1713654125/h1yv85s43fgsmelxukbk.mp4"
  );
  const [nextvideourl, setnextvideourl] = useState("");
  const [currentque, setcurrentque] = useState(-1);
  const [button, setbutton] = useState(false);
  const [message, setMessage] = useState("");
  const [mymsg, setmymsg] = useState([]);
  const [loading, setlaoding] = useState(false);

  const handclear = () => {
    setque([]);
    setmymsg([]);
  };

  const fetchque = async () => {
    setlaoding(true);
    const ques = await axios.get("/api/google");
    //  console.log(ques.data);
    const q = ques.data.split("\n");
    console.log(q);
    setque([...q, ...que]);
    console.log("fetching que");
    setlaoding(false);
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
            "Bearer " + "sk-mN5kwzA47vU2K2HzWpIW9klVd1kHH1EgJFm7C023UKa0GDdI",
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
      setaimsg([...aimsg, que[currentque]]);
    }
  }, [currentque]);

  const startinteview = () => {
    setbutton(!button);
    if (currentque == -1) {
      setcurrentque(0);
    }
  };

  useEffect(() => {
    fetchque();
  }, []);

  useEffect(() => {
    console.log("i changed", message);
    setmymsg([message, ...mymsg]); 
  }, [message]);

  const handlenext = () => {
    console.log(currentque);
    if (currentque >= 9) {
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
        {loading ? (
          <div
            style={{
              display: "flex",
              height: "90%",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BarLoader color="#36d7b7" />
          </div>
        ) : (
          <div>
            <div
              className="message-left employee-message"
              style={{
                display: "flex",
                alignContent: "flex-end",
                height: "7.5vh",
                justifyContent: "center",
              }}
            >
              <p>You can Start Now </p>
            </div>
            {aimsg.map((message) => {
              return <Aichat val={message} />;
            })}
          </div>
        )}
        {mymsg.map((val) => {
          console.log(mymsg);
          return <Mytext message={val} />;
        })}
        <Dictaphone1 message={message} setMessage={setMessage} />
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
          <button onClick={startinteview} disabled={loading}>
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

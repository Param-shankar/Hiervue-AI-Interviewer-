import React from 'react';
import '../Components/style1.css';

function ChatContainer() {
  return (
    <div id="chat-container">
      <div id="left-chat">
        <div className="nav">
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ width: '25px' }}> </div>
            <div style={{ fontSize: 'larger', fontWeight: 700 }}>Chats</div>
            <div>
              <i className='bx bxs-chat' style={{ fontSize: '22px' }}></i>
            </div>
            <div>
              <i className='bx bx-pin' style={{ fontSize: '22px' }}></i>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div>
              <i className='bx bx-trash-alt' style={{ fontSize: '22px' }}></i>
            </div>
            <button style={{ fontSize: 'larger', fontWeight: 700, background: 'transparent', color: 'white', borderRadius: '4px', border: '2px solid white' }}>Clear All</button>
            <div style={{ width: '25px' }}> </div>
          </div>
        </div>
        <br />
        <div className="message-left ai-message">
          <p>This is an AI message.</p>
        </div>
        <div className="message-left employee-message">
          <p>This is an employee message.</p>
        </div>
      </div>
      <div id="right-chat">
        <div id="ai-chat">
          <div className="message">
            <img id="ai-avatar" src="\frontend\assests\Designer.png" alt="AI Avatar" />
            <p>This is an AI message.</p>
          </div>
        </div>
        <div id="employee-chat">
          <div className="message">
            <img id="employee-avatar" src="\frontend\assests\Designer.png" alt="Employee Avatar" />
            <p>This is an employee message.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatContainer;

import React from 'react';
import './style1.css'; // Import your CSS file
import logo from '../assets/logo.jpeg'; // Import your logo image
import designerImg from '../assets/Designer.png';; // Import your language option image

function LanguageOptions() {
  const changeLanguage = (language) => {
    // You can implement the language change functionality here
    // For demonstration purposes, let's just alert the selected language
    alert("Selected Language: " + language);
  };

  return (
    <div>
      <nav>
        <div>
          <div className="logo">
            <img src={logo} alt="logo image" style={{ width: '65px', height: '65px' }} />
          </div>
        </div>
        <button className="btn-red-sm" onClick={() => loginpage()}>sign in</button>
      </nav>
      <div style={{ backgroundColor: 'rgba(159, 159, 159, 0.826)', height: '3px', width: '100%' }}></div>
      <br /><br /><br /><br /><br />
      <div style={{ color: 'aliceblue', textAlign: 'center', fontSize: '35px' }}>Select Your Language</div>
      <div className="container">
        <div className="language-option" onClick={() => changeLanguage('hindi')}>
          <img src={designerImg} alt="Hindi" /><br /><br />
          <div style={{ color: 'aliceblue', textAlign: 'center', fontSize: 'medium', fontWeight: '500' }}>हिन्दी</div>
        </div>
        <div className="language-option" onClick={() => changeLanguage('english')}>
          <img src={designerImg} alt="English" /><br /><br />
          <div style={{ color: 'aliceblue', textAlign: 'center', fontSize: 'medium', fontWeight: '500' }}>English</div>
        </div>
      </div>
    </div>
  );
}

function loginpage() {
  // You can implement the login page navigation here
}

export default LanguageOptions;

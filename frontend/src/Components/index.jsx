import React from 'react';


  const handleSubmit = ()=>{
    
  }
class UploadForm extends React.Component {

    render() {
        return (
            <div>
                <header className="header">
                    <div className="container">
                        <div className="logo">
                            <img src="logo1.jpg" alt="logo" />
                            <h1>Das</h1>
                        </div>
                        <nav className="menu">
                            <div className="head">
                                <div className="logo"><img src="logo1.jpg" alt="logo" /> </div>
                                <button type="button" className="close-menu-btn"></button>
                            </div>
                            <ul>
                                <li><a href="#">Home</a></li>
                                <li><a href="#">About</a></li>
                            </ul>
                        </nav>
                    </div>
                </header>
                <section className="body-1">
                    <div className="content1">
                        <h1 style={{ fontSize: '70px' }}>Das </h1>
                        <br /><br /><h3 style={{ fontSize: '50px' }}>Interview Round</h3>
                    </div>
                    <div className="content2">
                        <form onSubmit={handlesubmit}>
                            <label htmlFor="UserName">UserName</label><br />
                            <input type="text" /><br /><br />
                            <label htmlFor="email"> E-mail ID</label><br />
                            <input type="email" /><br /><br />
                            <label htmlFor="pdf"></label>
                            <input type="file" name="pdfFile" accept=".pdf" />
                            <button type="submit">Upload</button>
                        </form>
                    </div>
                </section>
                <script src="home_page.js"></script>
            </div>
        );
    }

    handleSubmit(event) {
        event.preventDefault();
        // Handle form submission logic here
    }
}

export default UploadForm;

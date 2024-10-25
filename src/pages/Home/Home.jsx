import './Home.css';

function Home() {
    return (
        <div className='home-container'>
            <div className="profile-container">
      <div className="profile-image-section">
        <img 
          src="./public/img/profile.jpg" 
          alt="Chonlakorn Bualuang" 
          className="profile-image"
        />
        <div className="profile-name">
          <h2>Chonlakorn Bualuang</h2>
          <p>Currently studying at</p>
          <p>Computer Science and Software Development Innovation Department (CSI)</p>
          <p>at Sripatum University (SPU)</p>
        </div>
      </div>
      <div className="profile-info-section">
        <h3>Personal information:</h3>
        <ul>
          <li><strong>Name:</strong> Chonlakorn Bualuang</li>
          <li><strong>Nickname:</strong> Tan</li>
          <li><strong>Age:</strong> 19 years old</li>
          <li><strong>My birthday:</strong> 5th of February 2005</li>
          <li><strong>Studying at:</strong> Sripatum University, Computer Science and Software Development Innovation Department, Faculty of Information Technology</li>
          <li><strong>Study about:</strong> Full stack software development by writing code such as HTML, CSS, JAVASCRIPT, PYTHON, PHP, .NET, NODEJS, JAVA, etc. Making it possible to solve problems, design systems, design UX/UI and develop software for both FRONT-END and BACK-END parts.</li>
        </ul>
        <p>Thanks for visiting my website !!!</p>
      </div>
    </div>
        </div>
      );
}

export default Home;
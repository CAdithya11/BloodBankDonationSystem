import bellIcon from '../Assets/notification.svg';
import avatarIcon from '../Assets/avatar.jpg';
import './TopBanner.css';

function TopBanner() {
  return (
    <>
      <div className="Alogin">
        <div className="login-info">
          <img id="bellIcon" src={bellIcon} alt="bellIcon" />
          <div className="profile">
            <div className="profile-info">
              <p className="title">Luna Deo</p>
              <p className="role">Donor</p>
            </div>
            <img src={avatarIcon} alt="profileImage" />
          </div>
        </div>
      </div>
      <div className="welcome">
        <div className="welcomeImage"></div>
        <div className="welcomeMessage">
          <p className="messageHead">Welcome Donor!</p>
          <p className="messageBody">"Be the reason for someone's heartbeat"</p>
        </div>
      </div>
    </>
  );
}
export default TopBanner;

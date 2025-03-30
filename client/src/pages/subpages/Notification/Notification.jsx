import "./Notification.css";
import { FaStar } from "react-icons/fa";
import userIcon from "../../../assets/dummyUserIcon.png";
import { GoTrash } from "react-icons/go";

const Notification = () => {
  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1>Notification</h1>
      </div>

      <div className="notification-container">
        <div className="notification">
          <div className="checked-box"></div>
          <div className="priority">
            <FaStar size={20} color="green" />
          </div>
          <div className="task-assigned-users">
            <img src={userIcon} alt="User Icon" className="user-img" />
            <img src={userIcon} alt="User Icon" className="user-img" />
            <img src={userIcon} alt="User Icon" className="user-img" />
          </div>
          <h3>Design Branding</h3>
          <p>Deadline:10/02/2022</p>
          <span>Came up with new design pattern that are new in trends</span>
          <button className="icon-btn btn-delete">
            <GoTrash size={18} />
          </button>
          <h4 className="notification-time">12:49 PM</h4>
        </div>
        <div className="notification">
          <div className="checked-box"></div>
          <div className="priority">
            <FaStar size={20} color="green" />
          </div>
          <div className="task-assigned-users">
            <img src={userIcon} alt="User Icon" className="user-img" />
            <img src={userIcon} alt="User Icon" className="user-img" />
            <img src={userIcon} alt="User Icon" className="user-img" />
          </div>
          <h3>Design Branding</h3>
          <p>Deadline:10/02/2022</p>
          <span>Came up with new design pattern that are new in trends</span>
          <button className="icon-btn btn-delete">
            <GoTrash size={18} />
          </button>
          <h4 className="notification-time">12:49 PM</h4>
        </div>
        <div className="notification">
          <div className="checked-box"></div>
          <div className="priority">
            <FaStar size={20} color="green" />
          </div>
          <div className="task-assigned-users">
            <img src={userIcon} alt="User Icon" className="user-img" />
            <img src={userIcon} alt="User Icon" className="user-img" />
            <img src={userIcon} alt="User Icon" className="user-img" />
          </div>
          <h3>Design Branding</h3>
          <p>Deadline:10/02/2022</p>
          <span>Came up with new design pattern that are new in trends</span>
          <button className="btn-delete">
            <GoTrash size={18} />
          </button>
          <h4 className="notification-time">12:49 PM</h4>
        </div>
        <div className="notification">
          <div className="checked-box"></div>
          <div className="priority">
            <FaStar size={20} color="green" />
          </div>
          <div className="task-assigned-users">
            <img src={userIcon} alt="User Icon" className="user-img" />
            <img src={userIcon} alt="User Icon" className="user-img" />
            <img src={userIcon} alt="User Icon" className="user-img" />
          </div>
          <h3>Design Branding</h3>
          <p>Deadline:10/02/2022</p>
          <span>Came up with new design pattern that are new in trends</span>
          <button className="icon-btn btn-delete">
            <GoTrash size={18} />
          </button>
          <h4 className="notification-time">12:49 PM</h4>
        </div>
      </div>
    </div>
  );
};

export default Notification;

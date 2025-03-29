import { FaRegBell } from "react-icons/fa6";
import { FaTasks } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="side-nav">
      <div className="logo">
        <Link to="/">
          <h1>TaskMinder</h1>
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <FaTasks className="nav-icon" title="tasks" />
              <span>Tasks</span>
            </Link>
          </li>
          <li>
            <Link to="/notification">
              <FaRegBell className="nav-icon" title="notification" />
              <span>Notification</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

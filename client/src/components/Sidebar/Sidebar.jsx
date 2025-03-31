import { FaRegBell } from "react-icons/fa6";
import { FaTasks } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

const navItems = [
  {
    path: "/",
    label: "Tasks",
    icon: <FaTasks className="nav-icon" size={18} />,
  },
  {
    path: "/notification",
    label: "Notification",
    icon: <FaRegBell className="nav-icon" size={18} />,
  },
  {
    path: "#",
    label: "Log out",
    icon: <FaRegBell className="nav-icon" size={18} />,
    className: "logout",
  },
];

const Sidebar = () => {
  const location = useLocation(); // Get current path

  return (
    <div className="side-nav">
      <div className="logo">
        <Link to="/">
          <h1>TaskMinder</h1>
        </Link>
      </div>
      <nav>
        <ul>
          {navItems.map(({ path, label, icon, className }) => (
            <li key={path}>
              <Link
                to={path}
                className={`${location.pathname === path ? "active" : ""} ${
                  className || ""
                }`}
              >
                {icon}
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

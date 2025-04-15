import { Link, NavLink } from "react-router-dom";
import useUserStore from "../../stores/userStore";
import "./Header.css";

function Header() {
  const user = useUserStore((state) => state.user);
  const removeUserInfo = useUserStore((state) => state.removeUserInfo);
  const navLinks = [
    { to: "/", label: "home" },
    { to: "/all-blogs", label: "explore" },
    { to: "/write", label: "write" },
    { to: "/my-blogs", label: "my blogs" },
    { to: "/my-profile", label: "my profile" },
  ];

  function handleLogout() {
    removeUserInfo();
  }

  if (!user) {
    return (
      <header className="header-logged-out">
        <div className="header-left-logged-out">
          <Link to="/">
            <p className="logo">Blogit</p>
          </Link>
        </div>

        <nav className="header-right-logged-out">
          <NavLink to="/signin">login</NavLink>
          <NavLink to="/signup">sign up</NavLink>
        </nav>
      </header>
    );
  } else {
    return (
      <header className="header-logged-in">
        <div className="header-left-logged-in">
          <Link to="/">
            <p className="logo">Blogit</p>
          </Link>
        </div>

        <nav className="header-middle-logged-in">
          {navLinks.map((navLink) => (
            <NavLink
              key={navLink.label}
              to={navLink.to}
              className={({ isActive }) =>
                isActive === true ? "active-link" : ""
              }
            >
              {navLink.label}
            </NavLink>
          ))}
          <button className="logout-btn" onClick={handleLogout}>
            log out
          </button>
        </nav>

        <div className="header-right-logged-in">
          <Link to="/my-profile"><p>hey {user.username}👋🏾</p></Link>
        </div>
      </header>
    );
  }
}

export default Header;

import { Link, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { useState } from "react";
import useUserStore from "../../stores/userStore";
import "./MobileHeader.css";

function MobileHeader() {
  const [click, setClick] = useState(false);
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
    toast.success("Logging you out.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      onClose: () => {
        removeUserInfo();
      },
    });
  }

  if (!user) {
    return (
      <header className="mobile-header-logged-out">
        <div className="mobile-header-left-logged-out">
          <Link to="/">
            <p className="mobile-logo">Blogit</p>
          </Link>
        </div>

        {click && (
          <nav className="mobile-header-right-logged-out">
            <NavLink to="/signin">login</NavLink>
            <NavLink to="/signup">sign up</NavLink>
          </nav>
        )}

        {click ? (
          <MdClose
            className="hamburger-menu"
            onClick={() => setClick(!click)}
          />
        ) : (
          <GiHamburgerMenu
            className="hamburger-menu"
            onClick={() => setClick(!click)}
          />
        )}
      </header>
    );
  } else {
    return (
      <>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <header className="mobile-header-logged-in">
          <div className="mobile-header-left-logged-in">
            <Link to="/">
              <p className="mobile-logo">Blogit</p>
            </Link>
          </div>

          {click && (
            <nav className="mobile-header-middle-logged-in">
              {navLinks.map((navLink) => (
                <NavLink
                  key={navLink.label}
                  to={navLink.to}
                  className={({ isActive }) =>
                    isActive === true ? "mobile-active-link" : ""
                  }
                >
                  {navLink.label}
                </NavLink>
              ))}
              <button className="mobile-logout-btn" onClick={handleLogout}>
                log out
              </button>
            </nav>
          )}

          <div className="mobile-header-right-logged-in">
            <Link to="/my-profile">
              <p>hey {user.userName}👋🏾</p>
            </Link>
          </div>

          {click ? (
            <MdClose
              className="hamburger-menu"
              onClick={() => setClick(!click)}
            />
          ) : (
            <GiHamburgerMenu
              className="hamburger-menu"
              onClick={() => setClick(!click)}
            />
          )}
        </header>
      </>
    );
  }
}

export default MobileHeader;

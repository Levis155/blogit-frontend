import "./Header.css"
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <div className="header-left">
        <p className="logo">Blogit</p>
      </div>

      <div className="header-right">
        <Link to="/login">login</Link>
        <Link to="/signup">sign up</Link>
      </div>
    </div>
  )
}

export default Header

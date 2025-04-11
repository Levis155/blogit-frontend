import "./Header.css"
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <div className="header-left">
        <p className="logo">Blogit</p>
      </div>

      <div className="header-right">
        <a href="#">login</a>
        <a href="#">sign up</a>
      </div>
    </div>
  )
}

export default Header

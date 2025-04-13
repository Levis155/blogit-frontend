import { Routes, Route } from "react-router-dom"
import Home from "./Pages/Home";
import AllBlogs from "./Pages/AllBlogs";
import Article from "./Pages/Article";
import Login from "./Pages/Login";
import MyBlogs from "./Pages/MyBlogs";
import MyProfile from "./Pages/MyProfile";
import Signup from "./Pages/Signup";
import Write from "./Pages/Write";
import Protected from "./Components/Protected/Protected";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/all-blogs" element={<Protected><AllBlogs /></Protected>} />
        <Route path="/my-blogs" element={<Protected><MyBlogs /></Protected>} />
        <Route path="/write" element={<Protected><Write /></Protected>} />
        <Route path="/my-profile" element={<Protected><MyProfile /></Protected>} />
        <Route path="/article" element={<Protected><Article /></Protected>} />
      </Routes>
    </>
  )
}

export default App

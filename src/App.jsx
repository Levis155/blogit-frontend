import { Routes, Route } from "react-router-dom"
import Home from "./Pages/Home";
import AllBlogs from "./Pages/AllBlogs";
import Article from "./Pages/Article";
import Login from "./Pages/Login";
import MyBlogs from "./Pages/MyBlogs";
import MyProfile from "./Pages/MyProfile";
import Signup from "./Pages/Signup";
import Write from "./Pages/Write";

function App() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/all-blogs" element={<AllBlogs />} />
        <Route path="/my-blogs" element={<MyBlogs />} />
        <Route path="/write" element={<Write />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/" element={<Article />} />
      </Routes>
    </>
  )
}

export default App

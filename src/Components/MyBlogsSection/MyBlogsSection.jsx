import "./MyBlogsSection.css";
import { NavLink } from "react-router-dom";
import { Tooltip } from 'react-tooltip';
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdModeEditOutline } from "react-icons/md";
import blogsListingImg from "../../assets/blogs-listing-img.jpg";

function MyBlogsSection() {
  return (
    <section className="my-blogs-section">
      <NavLink to="/write" className="create-new-link">create new blog</NavLink>
      <MyBlogsCard cardImg={blogsListingImg} cardTitle="The Unhurried Life: Why Slowing Down Makes You More Productive" publicationDate="11 April 2025" cardExcerpt="We chase efficiency, yet burnout follows. What if doing less—but with more focus—is the real key to success? Research and real-world stories reveal how slowing down can sharpen your mind, deepen relationships, and even boost creativity" />
      <MyBlogsCard cardImg={blogsListingImg} cardTitle="The Unhurried Life: Why Slowing Down Makes You More Productive" publicationDate="11 April 2025" cardExcerpt="We chase efficiency, yet burnout follows. What if doing less—but with more focus—is the real key to success? Research and real-world stories reveal how slowing down can sharpen your mind, deepen relationships, and even boost creativity" />
      <MyBlogsCard cardImg={blogsListingImg} cardTitle="The Unhurried Life: Why Slowing Down Makes You More Productive" publicationDate="11 April 2025" cardExcerpt="We chase efficiency, yet burnout follows. What if doing less—but with more focus—is the real key to success? Research and real-world stories reveal how slowing down can sharpen your mind, deepen relationships, and even boost creativity" />
      <MyBlogsCard cardImg={blogsListingImg} cardTitle="The Unhurried Life: Why Slowing Down Makes You More Productive" publicationDate="11 April 2025" cardExcerpt="We chase efficiency, yet burnout follows. What if doing less—but with more focus—is the real key to success? Research and real-world stories reveal how slowing down can sharpen your mind, deepen relationships, and even boost creativity" />
    </section>
  )
}

function MyBlogsCard({cardImg, cardTitle, publicationDate, cardExcerpt}) {
  return (
    <div className="my-blogs-card">
      <div className="my-blogs-card-img">
        <img src={cardImg} alt="blog image" />
      </div>

      <div className="my-blogs-card-content">
        <p className="my-blogs-card-title">{cardTitle}</p>
        <p className="publication-date">published on: {publicationDate}</p>
        <p className="my-blogs-card-excerpt">{cardExcerpt}</p>

        <div className="my-blogs-card-btns">
          <button><MdModeEditOutline data-tooltip-id="my-tooltip" data-tooltip-content="Edit Blog"/></button>
          <button><RiDeleteBin5Line data-tooltip-id="my-tooltip" data-tooltip-content="Delete Blog"/></button>
          <Tooltip id="my-tooltip" />
        </div>
      </div>
    </div>
  )
}

export default MyBlogsSection

import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import PulseLoader from "react-spinners/PulseLoader";
import "./BlogsListingSection.css";
import blogsListingImg from "../../assets/blogs-listing-img.jpg";
import randomUser from "../../assets/random-user.jpg";
import apiUrl from "../../utils/apiUrl";

function BlogsListingSection() {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["fetch-all-blogs"],
    queryFn: async () => {
      const response = await axios.get(`${apiUrl}/blogs/all-blogs`, {
        withCredentials: true,
      });
      return response.data.allUsersBlogs;
    },
  });

  return (
    <section className="blogs-listing-section">
      {isLoading && (
        <div className="loader-container">
          <PulseLoader size={30} color="#4b1e09" />
        </div>
      )}
      {isError && (
        <div className="error-container">
          <h1>error getting blogs.</h1>
        </div>
      )}
      {data &&
        data.map((item) => (
          <BlogsListingCard
            key={item.id}
            blogId={item.id}
            data={data}
            blogsListingCardImg={blogsListingImg}
            blogsListingProfilePic={randomUser}
            blogsListingFirstName={item.author.firstName}
            blogsListingLastName={item.author.lastName}
            blogsListingAuthorDate={item.updatedAt}
            blogsListingCardTitle={item.title}
            blogsListingCardExcerpt={item.excerpt}
          />
        ))}
    </section>
  );
}

function BlogsListingCard({
  data,
  blogId,
  blogsListingCardImg,
  blogsListingProfilePic,
  blogsListingFirstName,
  blogsListingLastName,
  blogsListingAuthorDate,
  blogsListingCardTitle,
  blogsListingCardExcerpt,
}) {
  return (
    <div className="blogs-listing-card">
      <div className="blogs-listing-card-top">
        <img src={blogsListingCardImg} alt="" />
      </div>
      <div className="blogs-listing-card-bottom">
        <div className="blogs-listing-author-cont">
          <div className="blogs-listing-profile-pic">
            <img src={blogsListingProfilePic} alt="" />
          </div>
          <div className="blogs-listing-author-details">
            <p className="blogs-listing-author-name">
              {blogsListingFirstName} {blogsListingLastName}
            </p>
            <p className="blogs-listing-author-date">
              last updated:{" "}
              {format(new Date(blogsListingAuthorDate), "dd MMMM yyyy")}
            </p>
          </div>
        </div>

        <p className="blogs-listing-card-title">{blogsListingCardTitle}</p>

        <p className="blogs-listing-card-excerpt">{blogsListingCardExcerpt}</p>

        <Link to={`/article/${blogId}`} className="blogs-listing-card-link">
          read more
        </Link>
      </div>
    </div>
  );
}

export default BlogsListingSection;

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import PulseLoader from "react-spinners/PulseLoader";
import "./BlogsListingSection.css";
import apiUrl from "../../utils/apiUrl";
import avatarImagePlaceholder from "../../assets/blank-user-img.png";
import blogImagePlaceholder from "../../assets/blank-blog-img.jpg";

function BlogsListingSection() {
  const { isLoading, isError, data, error } = useQuery({
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
        <div className="blogs-listing-loader-container">
          <PulseLoader size={30} color="#4b1e09" />
        </div>
      )}
      {isError && (
        <div className="blogs-listing-error-container">
          <h1>error getting blogs.</h1>
        </div>
      )}
      {!isError && !isLoading && data.length === 0 && (
        <div className="no-blogs">
          <h1>No blogs yet.</h1>
        </div>
      )}

      {!isError &&
        !isLoading &&
        data.length > 0 &&
        data.map((item) => (
          <BlogsListingCard
            key={item.id}
            blogId={item.id}
            data={data}
            blogsListingCardImg={item?.blogImageUrl || blogImagePlaceholder}
            blogsListingProfilePic={
              item.author?.profilePhotoUrl || avatarImagePlaceholder
            }
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
        <img src={blogsListingCardImg} alt="blog image" />
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

        <a href={`/article/${blogId}`} className="blogs-listing-card-link">
          read more
        </a>
      </div>
    </div>
  );
}

export default BlogsListingSection;

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import "./ArticleSection.css";
import avatarImagePlaceholder from "../../assets/blank-user-img.png";
import blogImagePlaceholder from "../../assets/blank-blog-img.jpg";
import apiUrl from "../../utils/apiUrl";

function ArticleSection() {
  const { blogId } = useParams();

  const { data } = useQuery({
    queryKey: ["get-blog-article"],
    queryFn: async () => {
      const response = await axios.get(`${apiUrl}/blogs/${blogId}`, {
        withCredentials: true,
      });
      return response.data;
    },
  });
  return (
    <div>
      <div className="back-link">
        <Link to={"/all-blogs"}>
        <IoIosArrowBack />back to blogs 
        </Link>
      </div>
      <section className="article-section">
        <ArticleContainer data={data} />
        <FeaturedArticles data={data} />
      </section>
    </div>
  );
}

function ArticleContainer({ data }) {
  return (
    <div className="article-container">
      <p className="article-title">{data && data.title}</p>

      <div className="blogs-listing-author-cont">
        <div className="blogs-listing-profile-pic">
          <img
            src={
              (data && data.author?.profilePhotoUrl) || avatarImagePlaceholder
            }
            alt=""
          />
        </div>
        <div className="blogs-listing-author-details">
          <p className="blogs-listing-author-name">
            {data && data.author.firstName} {data && data.author.lastName}
          </p>
          <p className="blogs-listing-author-date">
            updated on:{" "}
            {data && format(new Date(data.updatedAt), "dd MMMM yyyy")}
          </p>
        </div>
      </div>

      <div className="article-img">
        <img
          src={(data && data?.blogImageUrl) || blogImagePlaceholder}
          alt=""
        />
      </div>

      <div className="article-content">
        <p>This is where the article content will go.</p>
      </div>
    </div>
  );
}

function FeaturedArticles({ data }) {
  return (
    <div className="featured-articles-cont">
      <SameAuthorArticles authorId={data && data.author.id} />
      <MoreArticles />
    </div>
  );
}

function SameAuthorArticles({ authorId }) {
  const { isLoading, data } = useQuery({
    queryKey: ["fetch-all-users-blogs"],
    queryFn: async () => {
      const response = await axios.get(`${apiUrl}/blogs/all-blogs`, {
        withCredentials: true,
      });
      return response.data.allUsersBlogs;
    },
  });

  const blogsBySameUser =
    data?.filter((blog) => blog.authorId === authorId) || [];

  return (
    <div className="same-author-articles">
      <p className="featured-articles-title">from this author</p>

      {blogsBySameUser.length > 0 ? (
        blogsBySameUser.map((blog) => (
          <FeaturedArticleCard
            key={blog.id}
            blogId={blog.id}
            featuredArticleCardImage={
              blog?.blogImageUrl || blogImagePlaceholder
            }
            featuredArticleCardTitle={blog.title}
            authorUsername={blog.author.userName}
            updateDate={format(new Date(blog.updatedAt), "dd MMMM yyyy")}
          />
        ))
      ) : (
        <p>No other articles from this author</p>
      )}
    </div>
  );
}

function MoreArticles() {
  const { isLoading, data } = useQuery({
    queryKey: ["fetch-all-users-blogs"],
    queryFn: async () => {
      const response = await axios.get(`${apiUrl}/blogs/all-blogs`, {
        withCredentials: true,
      });
      return response.data.allUsersBlogs;
    },
  });

  if (isLoading) return <div>Loading more articles...</div>;

  const lastSevenBlogs = data?.slice(-7) || [];

  return (
    <div className="more-articles">
      <p className="featured-articles-title">more blogs</p>

      {lastSevenBlogs.map((blog) => (
        <FeaturedArticleCard
          key={blog.id}
          blogId={blog.id}
          featuredArticleCardImage={blog?.blogImageUrl || blogImagePlaceholder}
          featuredArticleCardTitle={blog.title}
          authorUsername={blog.author.userName}
          updateDate={format(new Date(blog.updatedAt), "dd MMMM yyyy")}
        />
      ))}
    </div>
  );
}

function FeaturedArticleCard({
  blogId,
  featuredArticleCardImage,
  featuredArticleCardTitle,
  authorUsername,
  updateDate,
}) {
  return (
    <a 
      href={`/article/${blogId}`}  
      className="featured-article-card-link"
    >
      <div className="featured-article-card">
        <div className="featured-article-left">
          <img src={featuredArticleCardImage} alt="" />
        </div>
        <div className="featured-article-right">
          <p className="featured-article-title">{featuredArticleCardTitle}</p>
          <div className="featured-article-details">
            <p className="featured-article-author">author: {authorUsername}</p>
            <p className="featured-article-date">Last updated: {updateDate}</p>
          </div>
        </div>
      </div>
    </a>
  );
}

export default ArticleSection;

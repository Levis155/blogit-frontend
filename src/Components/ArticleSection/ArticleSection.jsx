import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import "./ArticleSection.css";
import articleImg from "../../assets/blogs-listing-img.jpg";
import randomUser from "../../assets/random-user.jpg";
import axios from "axios";
import apiUrl from "../../utils/apiUrl";

function ArticleSection() {
  const {blogId} = useParams();

  const {isLoading, data, isError, error} = useQuery({
    queryKey: ["get-blog"],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3000/blogs/${blogId}`, {withCredentials: true})
      console.log(response.data);
      return response.data;
    }
  })
  return (
    <section className="article-section">
      <ArticleContainer data={data} />
      <FeaturedArticles />
    </section>
  );
}

function ArticleContainer({data}) {
  return (
    <div className="article-container">
      <p className="article-title">
        {data && data.title}
      </p>

      <div className="blogs-listing-author-cont">
        <div className="blogs-listing-profile-pic">
          <img src={randomUser} alt="" />
        </div>
        <div className="blogs-listing-author-details">
          <p className="blogs-listing-author-name">John Doe</p>
          <p className="blogs-listing-author-date">
            Last updated: 11 April 2025
          </p>
        </div>
      </div>

      <div className="article-img">
        <img src={articleImg} alt="" />
      </div>

      <div className="article-content">
        <h1>Introduction</h1>

        <p className="intro">
          We live in a world that glorifies "hustle culture"—where busyness is
          worn like a badge of honor. But what if the secret to true
          productivity isn't doing more, but doing less with greater intention?
          Emerging research suggests that slowing down can sharpen focus, reduce
          burnout, and even spark creativity.
        </p>

        <h2>The Problem With Speed</h2>

        <h3>1. The Myth of Multitasking</h3>
        <p>
          Studies show that multitasking reduces productivity by up to 40%. Our
          brains aren't wired to handle constant switching—instead, we end up
          exhausted and less effective.
        </p>

        <h3>2. Burnout: The Price of Perpetual Motion</h3>
        <p>
          Chronic stress from overwork doesn't just harm mental health—it
          weakens immune function, disrupts sleep, and stifles innovation.
        </p>

        <h2>The Science of Slowness</h2>

        <h3>1. Deep Work Shallow Busyness</h3>
        <p>
          Cal Newport's concept of "deep work" proves that focused,
          uninterrupted time leads to higher-quality output than fragmented
          tasks.
        </p>

        <h3>2. The Creative Power of Boredom</h3>
        <p>
          Moments of stillness allow the brain to make unexpected
          connections—many breakthroughs happen during walks, showers, or idle
          time.
        </p>

        <h2>How to Embrace Slow Living (Without Losing Productivity)</h2>

        <h3>1. Single-Tasking Over Multitasking</h3>
        <ul>
          <li>Try time-blocking for important tasks.</li>
          <li>Silence notifications during focus sessions.</li>
        </ul>

        <h3>2. Build "White Space" Into Your Day</h3>
        <ul>
          <li>Schedule short breaks between meetings.</li>
          <li>Take a tech-free walk daily.</li>
        </ul>

        <h3>3. Redefine Productivity</h3>
        <p>Measure success by impact—not hours worked. Did you:</p>
        <ul>
          <li>Solve a meaningful problem?</li>
          <li>Create something valuable?</li>
          <li>Feel energized, not drained?</li>
        </ul>
      </div>
    </div>
  );
}

function FeaturedArticles (data) {
    return(
        <div className="featured-articles-cont">
            <SameAuthorArticles />
            <MoreArticles />
        </div>
    )
}

function SameAuthorArticles() {
  return(
    <div className="same-author-articles">
        <p className="featured-articles-title">
            more from this author
        </p>

        <FeaturedArticleCard />
        <FeaturedArticleCard />
        <FeaturedArticleCard />
        <FeaturedArticleCard />
    </div>
  )
}

function MoreArticles () {
    return(
        <div className="more-articles">
                    <p className="featured-articles-title">
            more articles
        </p>
        <FeaturedArticleCard />
        <FeaturedArticleCard />
        <FeaturedArticleCard />
        <FeaturedArticleCard />
        </div>
    )
}

function FeaturedArticleCard () {
    return (
        <div className="featured-article-card">
        <div className="featured-article-left">
            <img src={articleImg} alt="" />
        </div>
        <div className="featured-article-right">
            <p className="featured-article-title">the creative power of boredom</p>
            <div className="featured-article-details">
                <p className="featured-article-author">Author: John Doe</p>
                <p className="featured-article-date">Last updated: 11 April 2025</p>
            </div>
        </div>
    </div>
    )
}

export default ArticleSection;

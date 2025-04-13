import { Link } from "react-router-dom"
import "./BlogsListingSection.css"
import blogsListingImg from "../../assets/blogs-listing-img.jpg";
import randomUser from "../../assets/random-user.jpg";

function BlogsListingSection() {
  return (
    <section className="blogs-listing-section">
        <BlogsListingCard blogsListingCardImg={blogsListingImg} blogsListingProfilePic={randomUser} blogsListingAuthorName="john doe" blogsListingAuthorDate="11 April 2025" blogsListingCardTitle="The Unhurried Life: Why Slowing Down Makes You More Productive" blogsListingCardExcerpt="We chase efficiency, yet burnout follows. What if doing less—but with more focus—is the real key to success? Research and real-world stories reveal how slowing down can sharpen your mind, deepen relationships, and even boost creativity" />

        <BlogsListingCard blogsListingCardImg={blogsListingImg} blogsListingProfilePic={randomUser} blogsListingAuthorName="john doe" blogsListingAuthorDate="11 April 2025" blogsListingCardTitle="The Unhurried Life: Why Slowing Down Makes You More Productive" blogsListingCardExcerpt="We chase efficiency, yet burnout follows. What if doing less—but with more focus—is the real key to success? Research and real-world stories reveal how slowing down can sharpen your mind, deepen relationships, and even boost creativity" />

        <BlogsListingCard blogsListingCardImg={blogsListingImg} blogsListingProfilePic={randomUser} blogsListingAuthorName="john doe" blogsListingAuthorDate="11 April 2025" blogsListingCardTitle="The Unhurried Life: Why Slowing Down Makes You More Productive" blogsListingCardExcerpt="We chase efficiency, yet burnout follows. What if doing less—but with more focus—is the real key to success? Research and real-world stories reveal how slowing down can sharpen your mind, deepen relationships, and even boost creativity" />

        <BlogsListingCard blogsListingCardImg={blogsListingImg} blogsListingProfilePic={randomUser} blogsListingAuthorName="john doe" blogsListingAuthorDate="11 April 2025" blogsListingCardTitle="The Unhurried Life: Why Slowing Down Makes You More Productive" blogsListingCardExcerpt="We chase efficiency, yet burnout follows. What if doing less—but with more focus—is the real key to success? Research and real-world stories reveal how slowing down can sharpen your mind, deepen relationships, and even boost creativity" />
    </section>
  )
}

function BlogsListingCard({blogsListingCardImg, blogsListingProfilePic, blogsListingAuthorName, blogsListingAuthorDate, blogsListingCardTitle, blogsListingCardExcerpt}) {
    return(
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
                        <p className="blogs-listing-author-name">{blogsListingAuthorName}</p>
                        <p className="blogs-listing-author-date">{blogsListingAuthorDate}</p>
                    </div>
                </div>

                <p className="blogs-listing-card-title">{blogsListingCardTitle}</p>

                <p className="blogs-listing-card-excerpt">{blogsListingCardExcerpt}</p>

                <Link to="/article" className="blogs-listing-card-link">
                    read more
                </Link>
            </div>
        </div>
    )
}

export default BlogsListingSection

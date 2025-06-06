import "./HeroSection.css";
import heroImage from "../../assets/hero-img.jpg";
import useUserStore from "../../stores/userStore";
import { Link } from "react-router-dom";

function HeroSection() {
  const user = useUserStore((state) => state.user);
  return (
    <section className="hero-section">
      <div className="hero-section-left">
        <p className="hero-section-tagline">
          We believe every thought deserves a home
        </p>
        <p className="hero-section-excerpt">
          Share freely, connect deeply, and let your ideas thrive in a community
          that values every voice. Because when thoughts have a home they grow
          into something extraordinary.
        </p>
        <div className="hero-cta-links-container">
          <Link to={user ? "/write" : "/signin"} className="hero-start-link">
            start sharing
          </Link>
          <Link to={user ? "/all-blogs" : "/signin"} className="hero-explore-link">
            explore blogs
          </Link>
        </div>
      </div>
      <div className="hero-section-middle">
        <div className="hero-image-cont">
          <img src={heroImage} alt="hero image" />
        </div>
      </div>

      <div className="hero-section-right">
        <div className="stat-container">
          <p className="stat-title">10K+</p>
          <p className="stat-subtitle">philosophers</p>
        </div>

        <div className="stat-container">
          <p className="stat-title">500K+</p>
          <p className="stat-subtitle">thoughts</p>
        </div>

        <div className="stat-container">
          <p className="stat-title">1M+</p>
          <p className="stat-subtitle">engagements</p>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

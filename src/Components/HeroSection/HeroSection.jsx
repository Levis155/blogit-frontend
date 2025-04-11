import "./HeroSection.css"
import heroImage from "../../assets/hero-img.jpg";

function HeroSection() {
  return (
    <section className="hero-section">
        <div className="hero-section-left">
            <p className="hero-section-tagline">
                We believe every thought deserves a home
            </p>
            <p className="hero-section-excerpt">
                Every thought, idea, and story deserves a place to belong - that's why Blogit. Here, your words find a home, whether they're fleeting reflections or bold declarations. Share freely, connect deeply, and let your ideas thrive in a community that values every voice. Because when thoughts have a home they grow into something extraordinary.
            </p>
            <div className="hero-cta-links-container">
                <a href="#" className="hero-start-link">begin writing</a>
                <a href="#" className="hero-explore-link">explore voices</a>
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
  )
}

export default HeroSection

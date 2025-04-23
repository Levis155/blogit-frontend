import BlogsListingSection from "../Components/BlogsListingSection/BlogsListingSection";
import MobileHeader from "../Components/MobileHeader/MobileHeader";
import Header from "../Components/Header/Header";

function AllBlogs() {
  return (
    <div>
      <Header />
      <MobileHeader />
      <BlogsListingSection />
    </div>
  );
}

export default AllBlogs;

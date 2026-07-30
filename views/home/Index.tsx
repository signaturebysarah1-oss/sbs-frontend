import Collections from "./Collections";
import FeaturedCollection from "./FeaturedCollections";
import Hero from "./Hero";
import ProcessSection from "./Process";
import WhySBSSection from "./WhySbs";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Collections />
      <FeaturedCollection/>
      <WhySBSSection/>
      <ProcessSection/>
    </div>
  );
};

export default HomePage;

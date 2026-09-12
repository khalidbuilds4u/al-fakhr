import Hero from "@/components/Hero";
import CategorySplit from "@/components/CategorySplit";
import FeaturedCollection from "@/components/FeaturedCollection";
import MasterPerfumers from "@/components/MasterPerfumers";
import USPs from "@/components/USPs";
import Testimonials from "@/components/Testimonials";
import BrandStory from "@/components/BrandStory";

export default function Home() {
  return (
    <>
      <Hero />
      <CategorySplit />
      <FeaturedCollection />
      <MasterPerfumers />
      <USPs />
      <Testimonials />
      <BrandStory />
    </>
  );
}

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import PopularSubjects from "@/components/PopularSubjects";
import TopTutors from "@/components/TopTutors";
import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <WhyChooseUs />
      <PopularSubjects />
      <TopTutors />
      <Testimonials />
      <CallToAction />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
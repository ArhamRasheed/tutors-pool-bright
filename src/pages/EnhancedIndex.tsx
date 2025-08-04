import Navbar from "@/components/Navbar";
import EnhancedHeroSection from "@/components/enhanced/EnhancedHeroSection";
import EnhancedWhyChooseUs from "@/components/enhanced/EnhancedWhyChooseUs";
import EnhancedPopularSubjects from "@/components/enhanced/EnhancedPopularSubjects";
import TopTutors from "@/components/TopTutors";
import EnhancedTestimonials from "@/components/enhanced/EnhancedTestimonials";
import EnhancedCallToAction from "@/components/enhanced/EnhancedCallToAction";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const EnhancedIndex = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <EnhancedHeroSection />
      <EnhancedWhyChooseUs />
      <EnhancedPopularSubjects />
      <TopTutors />
      <EnhancedTestimonials />
      <EnhancedCallToAction />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default EnhancedIndex;
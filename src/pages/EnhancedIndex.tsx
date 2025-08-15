import Navbar from "@/components/Navbar";
import EnhancedHeroSection from "@/components/enhanced/EnhancedHeroSection";
import EnhancedWhyChooseUs from "@/components/enhanced/EnhancedWhyChooseUs";
import EnhancedPopularSubjects from "@/components/enhanced/EnhancedPopularSubjects";
import TopTutors from "@/components/TopTutors";
import EnhancedTestimonials from "@/components/enhanced/EnhancedTestimonials";
import EnhancedCallToAction from "@/components/enhanced/EnhancedCallToAction";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const EnhancedIndex = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <style>
        {`
          /* Chrome, Safari, Edge */
          ::-webkit-scrollbar {
            display: none;
          }
          /* Firefox */
          html {
            scrollbar-width: none;
          }
        `}
      </style>
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
        {showButton && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-3 rounded-full 
               transition-all duration-300 ease-out
               hover:bg-blue-700 hover:-translate-y-1
               hover:shadow-[0_8px_20px_rgba(59,130,246,0.5)]"
          >
            <ArrowUp className="h-5 w-5" strokeWidth={4} />
          </button>
        )}

      </div>
    </>
  );
};

export default EnhancedIndex;
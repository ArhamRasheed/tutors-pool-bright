import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Play, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeInSection } from "@/components/FadeInSection";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const EnhancedHeroSection = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: hero1,
      title: "Excel in Your O/A Levels with Expert Tutors",
      subtitle: "Connect with qualified tutors for personalized one-to-one learning sessions. Master challenging subjects and achieve your academic goals."
    },
    {
      image: hero2,
      title: "Personalized One-on-One Learning",
      subtitle: "Get individual attention from experienced tutors who understand your learning style and help you succeed in your studies."
    },
    {
      image: hero3,
      title: "Achieve Academic Excellence",
      subtitle: "Join thousands of students who have improved their grades and gained confidence through our expert tutoring platform."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden 
             bg-gradient-to-br from-blue-50 via-white to-green-50 font-serif text-[15px] ">
      {/* Background Images with Parallax Effect */}
      <div className="absolute top-0 w-full h-24 md:h-28" />
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ${index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
        >
          <img
            src={slide.image}
            alt={`Hero ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-blue-800/50 to-green-900/70"></div>
        </div>
      ))}

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-400/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-green-400/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-14 h-14 bg-white/10 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white pt-28 pb-20">
        <FadeInSection direction="up" delay={300}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            {slides[currentSlide].title}
          </h1>
        </FadeInSection>

        <FadeInSection direction="up" delay={600}>
          <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-4xl mx-auto opacity-90 leading-relaxed">
            {slides[currentSlide].subtitle}
          </p>
        </FadeInSection>

        <FadeInSection direction="up" delay={900}>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button
              variant="hero"
              size="lg"
              onClick={() => navigate('/join?type=student')}
              className="group transform hover:scale-105 transition-all duration-300 shadow-2xl">
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Start Learning
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/join?type=tutor')}
              className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm">
              <Users className="mr-2 h-5 w-5" />
              Become a Tutor
            </Button>
          </div>
        </FadeInSection>

        {/* Stats Section */}
        <FadeInSection direction="up" delay={1200}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="text-3xl md:text-4xl font-bold mb-2">
                <AnimatedCounter end={500} suffix="+" />
              </div>
              <div className="text-white/80 font-medium">Happy Students</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="text-3xl md:text-4xl font-bold mb-2">
                <AnimatedCounter end={50} suffix="+" />
              </div>
              <div className="text-white/80 font-medium">Expert Tutors</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="text-3xl md:text-4xl font-bold mb-2">
                <AnimatedCounter end={95} suffix="%" />
              </div>
              <div className="text-white/80 font-medium">Success Rate</div>
            </div>
          </div>
        </FadeInSection>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 z-20 backdrop-blur-sm"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 z-20 backdrop-blur-sm"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
              ? "bg-white scale-125 shadow-lg"
              : "bg-white/50 hover:bg-white/70"
              }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      {/* <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div> */}
    </section>
  );
};

export default EnhancedHeroSection;
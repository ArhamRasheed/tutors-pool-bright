import { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeInSection } from "@/components/FadeInSection";

const EnhancedTestimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const testimonials = [
    {
      name: "Aisha Khan",
      class: "A Level Student",
      subject: "Mathematics",
      quote: "TutorsPool completely transformed my understanding of calculus. My tutor, Dr. Sarah, explained complex concepts in such a simple way. I went from struggling with derivatives to acing my A Level exams!",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      improvement: "C to A*",
      location: "London, UK"
    },
    {
      name: "James Wilson",
      class: "O Level Student",
      subject: "Physics",
      quote: "I was terrified of physics until I joined TutorsPool. My tutor made quantum mechanics feel like a fun puzzle to solve. The interactive sessions and real-world examples made all the difference.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      improvement: "D to A",
      location: "Manchester, UK"
    },
    {
      name: "Fatima Ali",
      class: "A Level Student",
      subject: "Chemistry",
      quote: "The flexibility of TutorsPool allowed me to balance my studies with part-time work. My chemistry tutor was always available when I needed help, even for last-minute doubts before exams.",
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      improvement: "B to A*",
      location: "Birmingham, UK"
    },
    {
      name: "David Chen",
      class: "O Level Student",
      subject: "Biology",
      quote: "My biology tutor used amazing visual aids and interactive models to explain complex processes. I finally understood photosynthesis and cellular respiration. Biology became my favorite subject!",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      improvement: "C to A",
      location: "Edinburgh, UK"
    },
    {
      name: "Sarah Ahmed",
      class: "A Level Student",
      subject: "Economics",
      quote: "Thanks to TutorsPool, I not only improved my grades but also developed a genuine interest in economics. My tutor's real-world examples helped me understand market dynamics perfectly.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      improvement: "B to A*",
      location: "Cardiff, UK"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: rating }, (_, index) => (
      <Star key={index} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50/30 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-1/4 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-32 h-32 bg-green-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeInSection direction="up" className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium">
            Student Success Stories
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Real Results from Real Students
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Discover how our personalized tutoring has transformed students' academic journeys
          </p>
        </FadeInSection>

        {/* Main Testimonial */}
        <FadeInSection direction="up" delay={200}>
          <div className="relative max-w-4xl mx-auto mb-12">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <Avatar className="w-24 h-24 ring-4 ring-blue-100">
                      <AvatarImage src={testimonials[currentTestimonial].image} alt={testimonials[currentTestimonial].name} />
                      <AvatarFallback className="text-xl font-semibold bg-gradient-to-r from-blue-500 to-green-500 text-white">
                        {testimonials[currentTestimonial].name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <Quote className="h-8 w-8 text-blue-500 mb-4 mx-auto md:mx-0" />
                    <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed italic">
                      "{testimonials[currentTestimonial].quote}"
                    </p>
                    
                    <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 text-lg">{testimonials[currentTestimonial].name}</h4>
                        <p className="text-gray-600">{testimonials[currentTestimonial].class} • {testimonials[currentTestimonial].location}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {testimonials[currentTestimonial].subject}
                        </Badge>
                        <Badge className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
                          Grade: {testimonials[currentTestimonial].improvement}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center md:justify-start">
                      {renderStars(testimonials[currentTestimonial].rating)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg"
              onClick={prevTestimonial}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg"
              onClick={nextTestimonial}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </FadeInSection>

        {/* Testimonial Indicators */}
        <div className="flex justify-center space-x-2 mb-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentTestimonial 
                  ? "bg-blue-500 scale-125" 
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              onClick={() => setCurrentTestimonial(index)}
            />
          ))}
        </div>

        {/* Stats Section */}
        <FadeInSection direction="up" delay={400}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-blue-100">
              <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-sm text-gray-600">Grade Improvement</div>
            </div>
            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-green-100">
              <div className="text-3xl font-bold text-green-600 mb-2">4.9</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-purple-100">
              <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-sm text-gray-600">Success Stories</div>
            </div>
            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-orange-100">
              <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default EnhancedTestimonials;
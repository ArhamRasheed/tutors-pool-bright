import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Testimonials = () => {
  const { ref, isVisible } = useScrollAnimation();
  const testimonials = [
    {
      name: "Aisha Khan",
      class: "A Level Student",
      quote: "TutorsPool helped me improve my math grades from C to A*. The one-on-one sessions were incredibly helpful!",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=150&h=150&fit=crop&crop=face",
      rating: 5
    },
    {
      name: "James Wilson",
      class: "O Level Student",
      quote: "My physics tutor explained complex concepts so clearly. I finally understand quantum mechanics!",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5
    },
    {
      name: "Fatima Ali",
      class: "A Level Student",
      quote: "The flexible scheduling allowed me to balance studies with extracurriculars. Highly recommend!",
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
      rating: 5
    },
    {
      name: "David Chen",
      class: "O Level Student",
      quote: "Chemistry became my favorite subject after joining TutorsPool. The tutors are amazing!",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5
    },
    {
      name: "Sarah Ahmed",
      class: "A Level Student",
      quote: "Got into my dream university thanks to the excellent preparation I received here.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5
    },
    {
      name: "Ali Hassan",
      class: "O Level Student",
      quote: "The demo session convinced me to join. Best decision for my academic career!",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      rating: 5
    }
  ];

  const [isPausedRow1, setIsPausedRow1] = useState(false);
  const [isPausedRow2, setIsPausedRow2] = useState(false);

  const renderStars = (rating: number) => {
    return Array.from({ length: rating }, (_, index) => (
      <Star key={index} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
    ));
  };

  const TestimonialCard = ({ testimonial, index }: { testimonial: any; index: number }) => (
    <div className="bg-card rounded-2xl p-6 shadow-elegant border border-border/50 min-w-[350px] mx-4">
      <div className="flex items-center mb-4">
        <Avatar className="w-12 h-12 mr-4">
          <AvatarImage src={testimonial.image} alt={testimonial.name} />
          <AvatarFallback className="bg-gradient-primary text-white">
            {testimonial.name.split(' ').map((n: string) => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
          <p className="text-sm text-muted-foreground">{testimonial.class}</p>
        </div>
      </div>
      <div className="flex mb-3">
        {renderStars(testimonial.rating)}
      </div>
      <p className="text-muted-foreground italic leading-relaxed">
        "{testimonial.quote}"
      </p>
    </div>
  );

  return (
    <section ref={ref} className="py-20 bg-background overflow-hidden">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What Our Students Say
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Real feedback from students who achieved their academic goals
          </p>
        </div>
      </div>

      {/* First Row - Left to Right */}
      <div
        className="flex mb-8"
        onMouseEnter={() => setIsPausedRow1(true)}
        onMouseLeave={() => setIsPausedRow1(false)}
      >
        <div className={`flex animate-scroll-right ${isPausedRow1 ? 'pause-animation' : ''}`}>
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <TestimonialCard key={`row1-${index}`} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>

      {/* Second Row - Right to Left */}
      <div
        className="flex"
        onMouseEnter={() => setIsPausedRow2(true)}
        onMouseLeave={() => setIsPausedRow2(false)}
      >
        <div className={`flex animate-scroll-left ${isPausedRow2 ? 'pause-animation' : ''}`}>
          {[...testimonials.slice().reverse(), ...testimonials.slice().reverse()].map((testimonial, index) => (
            <TestimonialCard key={`row2-${index}`} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes scroll-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0%); }
          }
          @keyframes scroll-left {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll-right {
            animation: scroll-right 30s linear infinite;
          }
          .animate-scroll-left {
            animation: scroll-left 30s linear infinite;
          }
          .pause-animation {
            animation-play-state: paused;
          }
        `
      }} />
    </section>
  );
};

export default Testimonials;
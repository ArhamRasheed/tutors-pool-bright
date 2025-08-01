import { ArrowRight, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full animate-float"></div>
        <div className="absolute top-32 right-20 w-16 h-16 border-2 border-white rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 border-2 border-white rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 right-1/3 w-14 h-14 border-2 border-white rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 animate-fade-in">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-12 animate-fade-in">
            Start learning with top tutors or apply to become one today. Join our community of learners and educators.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in">
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 border-white group shadow-elegant hover:shadow-glow transform hover:-translate-y-0.5 transition-all duration-300"
            >
              <BookOpen className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Start Learning
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-transparent text-white border-white/30 hover:bg-white/10 group shadow-elegant hover:shadow-glow transform hover:-translate-y-0.5 transition-all duration-300"
            >
              <Users className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Become a Tutor
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 animate-fade-in">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-white/80">Happy Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-white/80">Expert Tutors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">95%</div>
              <div className="text-white/80">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
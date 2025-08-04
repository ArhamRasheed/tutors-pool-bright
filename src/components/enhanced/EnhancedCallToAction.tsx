import { ArrowRight, Users, BookOpen, Sparkles, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeInSection } from "@/components/FadeInSection";

const EnhancedCallToAction = () => {
  const benefits = [
    "Free demo session with expert tutors",
    "Personalized learning plan",
    "24/7 support and resources",
    "Money-back guarantee"
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full animate-float"></div>
        <div className="absolute top-32 right-20 w-24 h-24 border-2 border-white rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 border-2 border-white rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 right-1/3 w-28 h-28 border-2 border-white rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-green-600/90"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <FadeInSection direction="left">
              <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30">
                <Sparkles className="w-4 h-4 mr-2" />
                Limited Time Offer
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Ready to Transform Your Academic Journey?
              </h2>
              <p className="text-lg md:text-xl mb-8 opacity-90 leading-relaxed">
                Join thousands of students who have achieved their academic goals with our expert tutors. 
                Start with a free demo session and experience the difference personalized learning makes.
              </p>

              {/* Benefits List */}
              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <FadeInSection key={index} direction="left" delay={index * 100}>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-300 flex-shrink-0" />
                      <span className="text-white/90">{benefit}</span>
                    </div>
                  </FadeInSection>
                ))}
              </div>

              <FadeInSection direction="left" delay={400}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="bg-white text-blue-600 hover:bg-white/90 border-white group shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300"
                  >
                    <BookOpen className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    Start Free Demo
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="bg-transparent text-white border-white/30 hover:bg-white/10 group shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300"
                  >
                    <Users className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    Become a Tutor
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </FadeInSection>
            </FadeInSection>
          </div>

          {/* Right Content - Stats Cards */}
          <div className="space-y-6">
            <FadeInSection direction="right" delay={200}>
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl font-bold">500+</div>
                    <Users className="h-8 w-8 text-blue-300" />
                  </div>
                  <div className="text-white/80">Happy Students</div>
                  <div className="text-sm text-white/60 mt-2">Achieved their academic goals</div>
                </CardContent>
              </Card>
            </FadeInSection>

            <FadeInSection direction="right" delay={400}>
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl font-bold">50+</div>
                    <BookOpen className="h-8 w-8 text-green-300" />
                  </div>
                  <div className="text-white/80">Expert Tutors</div>
                  <div className="text-sm text-white/60 mt-2">Qualified and experienced</div>
                </CardContent>
              </Card>
            </FadeInSection>

            <FadeInSection direction="right" delay={600}>
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl font-bold">95%</div>
                    <Sparkles className="h-8 w-8 text-yellow-300" />
                  </div>
                  <div className="text-white/80">Success Rate</div>
                  <div className="text-sm text-white/60 mt-2">Students improve their grades</div>
                </CardContent>
              </Card>
            </FadeInSection>
          </div>
        </div>

        {/* Bottom CTA */}
        <FadeInSection direction="up" delay={800} className="text-center mt-16">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Special Launch Offer - 50% Off First Month!
            </h3>
            <p className="text-white/80 mb-6 max-w-md mx-auto">
              Limited time offer for new students. Start your journey today and save big on your first month of tutoring.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-white/90 border-white shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Claim Offer Now
              </Button>
              <div className="text-white/60 text-sm">
                ⏰ Offer expires in 7 days
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default EnhancedCallToAction;
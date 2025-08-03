import { Shield, Users, Clock, Gift, Monitor, Award } from "lucide-react";
import { FadeInSection } from "@/components/FadeInSection";
import { Card, CardContent } from "@/components/ui/card";

const EnhancedWhyChooseUs = () => {
  const features = [
    {
      icon: Shield,
      title: "Verified Tutors",
      description: "All our tutors are carefully screened and verified for their qualifications and teaching experience.",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Users,
      title: "One-on-One Help",
      description: "Personalized attention with dedicated tutors who focus entirely on your learning needs.",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Book sessions at your convenience with 24/7 availability to fit your busy schedule.",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: Gift,
      title: "Free Demo Sessions",
      description: "Try our platform risk-free with complimentary demo sessions before committing.",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      icon: Monitor,
      title: "Any Device Access",
      description: "Learn from anywhere using your computer, tablet, or smartphone with our responsive platform.",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50"
    },
    {
      icon: Award,
      title: "Proven Results",
      description: "95% of our students improve their grades within the first month of joining our platform.",
      color: "text-red-600",
      bgColor: "bg-red-50"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-blue-50/30 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-green-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeInSection direction="up" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Why Choose TutorsPool?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Invest in your academic success with our comprehensive learning platform
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FadeInSection
              key={index}
              direction={index % 2 === 0 ? "left" : "right"}
              delay={index * 100}
            >
              <Card className="group h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer">
                <CardContent className="p-8 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${feature.bgColor} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </FadeInSection>
          ))}
        </div>

        {/* Trust Indicators */}
        <FadeInSection direction="up" delay={800} className="mt-20">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Trusted by Students Worldwide</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="text-3xl font-bold">4.9/5</div>
                <div className="text-blue-100">Average Rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold">10k+</div>
                <div className="text-blue-100">Sessions Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold">50+</div>
                <div className="text-blue-100">Countries</div>
              </div>
              <div>
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-blue-100">Support</div>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default EnhancedWhyChooseUs;
import { Shield, Users, Clock, Gift, Monitor } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: Shield,
      title: "Verified Tutors",
      description: "All our tutors are carefully screened and verified for their qualifications and teaching experience."
    },
    {
      icon: Users,
      title: "One-on-One Help",
      description: "Personalized attention with dedicated tutors who focus entirely on your learning needs."
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Book sessions at your convenience with 24/7 availability to fit your busy schedule."
    },
    {
      icon: Gift,
      title: "Free Demo Sessions",
      description: "Try our platform risk-free with complimentary demo sessions before committing."
    },
    {
      icon: Monitor,
      title: "Accessible via Any Device",
      description: "Learn from anywhere using your computer, tablet, or smartphone with our responsive platform."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Why Choose Us
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Invest in your professional goals with TutorsPool
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl p-8 shadow-elegant hover:shadow-glow transition-all duration-300 hover:-translate-y-2 animate-fade-in border border-border/50"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-gradient-primary w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:animate-float">
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
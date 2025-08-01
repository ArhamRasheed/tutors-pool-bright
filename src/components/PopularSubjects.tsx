import { Calculator, Atom, FlaskConical, Dna, TrendingUp, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const PopularSubjects = () => {
  const { ref, isVisible } = useScrollAnimation();
  const subjects = [
    {
      icon: Calculator,
      title: "Mathematics",
      description: "Master algebra, calculus, geometry, and advanced mathematical concepts with expert guidance.",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Atom,
      title: "Physics",
      description: "Understand complex physics principles, mechanics, thermodynamics, and quantum theory.",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: FlaskConical,
      title: "Chemistry",
      description: "Excel in organic, inorganic, and physical chemistry with practical applications.",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: Dna,
      title: "Biology",
      description: "Explore life sciences, genetics, ecology, and human anatomy with detailed explanations.",
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      icon: TrendingUp,
      title: "Economics",
      description: "Learn micro and macroeconomics, market dynamics, and economic theories.",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    },
    {
      icon: BookOpen,
      title: "English Literature",
      description: "Develop critical analysis skills and master essay writing for O/A Level success.",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50"
    }
  ];

  return (
    <section ref={ref} id="courses" className="py-20 bg-background">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Most Popular Subjects
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our comprehensive range of subjects taught by expert tutors
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subjects.map((subject, index) => (
            <Card
              key={index}
              className="group hover:shadow-glow transition-all duration-300 hover:-translate-y-2 border-border/50 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className={`w-14 h-14 rounded-xl ${subject.bgColor} flex items-center justify-center mb-4 group-hover:animate-float`}>
                  <subject.icon className={`h-7 w-7 ${subject.color}`} />
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {subject.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground mb-6 leading-relaxed">
                  {subject.description}
                </CardDescription>
                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all"
                >
                  View Course
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularSubjects;
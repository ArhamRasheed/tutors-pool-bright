import { Calculator, Atom, FlaskConical, Dna, TrendingUp, BookOpen, Globe, Code } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeInSection } from "@/components/FadeInSection";

const EnhancedPopularSubjects = () => {
  const navigate = useNavigate();

  const subjects = [
    {
      icon: Calculator,
      title: "Mathematics",
      description: "Master algebra, calculus, geometry, and advanced mathematical concepts with expert guidance.",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      students: "2.5k+ students",
      rating: "4.9",
      level: "O & A Level"
    },
    {
      icon: Atom,
      title: "Physics",
      description: "Understand complex physics principles, mechanics, thermodynamics, and quantum theory.",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      students: "1.8k+ students",
      rating: "4.8",
      level: "O & A Level"
    },
    {
      icon: FlaskConical,
      title: "Chemistry",
      description: "Excel in organic, inorganic, and physical chemistry with practical applications.",
      color: "text-green-600",
      bgColor: "bg-green-50",
      students: "2.1k+ students",
      rating: "4.9",
      level: "O & A Level"
    },
    {
      icon: Dna,
      title: "Biology",
      description: "Explore life sciences, genetics, ecology, and human anatomy with detailed explanations.",
      color: "text-red-600",
      bgColor: "bg-red-50",
      students: "1.9k+ students",
      rating: "4.7",
      level: "O & A Level"
    },
    {
      icon: TrendingUp,
      title: "Economics",
      description: "Learn micro and macroeconomics, market dynamics, and economic theories.",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      students: "1.2k+ students",
      rating: "4.8",
      level: "A Level"
    },
    {
      icon: BookOpen,
      title: "English Literature",
      description: "Develop critical analysis skills and master essay writing for O/A Level success.",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      students: "1.5k+ students",
      rating: "4.6",
      level: "O & A Level"
    },
    {
      icon: Globe,
      title: "Geography",
      description: "Understand physical and human geography with interactive maps and case studies.",
      color: "text-teal-600",
      bgColor: "bg-teal-50",
      students: "900+ students",
      rating: "4.7",
      level: "O & A Level"
    },
    {
      icon: Code,
      title: "Computer Science",
      description: "Learn programming, algorithms, and computational thinking for the digital age.",
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      students: "1.1k+ students",
      rating: "4.9",
      level: "O & A Level"
    }
  ];

  const handleExploreCourse = (subjectTitle: string) => {
    // Navigate to course details with subject title as parameter
    navigate(`/course/${subjectTitle.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <section id="courses" className="py-20 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-40 left-10 w-24 h-24 bg-blue-500 rounded-full blur-2xl"></div>
        <div className="absolute bottom-40 right-10 w-32 h-32 bg-green-500 rounded-full blur-2xl"></div>
        <div className="absolute top-20 right-1/4 w-20 h-20 bg-purple-500 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeInSection direction="up" className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium">
            Popular Subjects
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Master Any Subject
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive range of subjects taught by expert tutors with proven track records
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subjects.map((subject, index) => (
            <FadeInSection
              key={index}
              direction="up"
              delay={index * 100}
            >
              <Card className="group h-full bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden">
                <CardHeader className="pb-4">
                  <div className={`w-14 h-14 rounded-xl ${subject.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <subject.icon className={`h-7 w-7 ${subject.color}`} />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                      {subject.title}
                    </CardTitle>
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm font-medium text-gray-600">{subject.rating}</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="w-fit text-xs">
                    {subject.level}
                  </Badge>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-gray-600 mb-4 leading-relaxed text-sm">
                    {subject.description}
                  </CardDescription>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-gray-500">{subject.students}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300"
                    onClick={() => handleExploreCourse(subject.title)}
                  >
                    Explore Course
                  </Button>
                </CardContent>
              </Card>
            </FadeInSection>
          ))}
        </div>

        {/* CTA Section */}
        <FadeInSection direction="up" delay={400} className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-3xl p-8 border border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Can't find your subject?
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              We offer tutoring in 20+ subjects. Contact us to find the perfect tutor for your specific needs.
            </p>
            <Button variant="hero" size="lg" className="shadow-lg hover:shadow-xl transition-all duration-300">
              Request Custom Subject
            </Button>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default EnhancedPopularSubjects;
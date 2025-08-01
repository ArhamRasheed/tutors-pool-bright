import { Star, BookOpen, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const TopTutors = () => {
  const tutors = [
    {
      id: 1,
      name: "Dr. Sarah Ahmed",
      subject: "Mathematics & Physics",
      bio: "PhD in Mathematical Physics with 8+ years of teaching experience. Specialized in O/A Level curriculum.",
      rating: 4.9,
      students: 150,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=400&h=400&fit=crop&crop=face",
      badges: ["Top Rated", "Expert"]
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      subject: "Chemistry & Biology",
      bio: "Former university lecturer with expertise in organic chemistry and molecular biology. 10+ years experience.",
      rating: 4.8,
      students: 120,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      badges: ["Verified", "Popular"]
    },
    {
      id: 3,
      name: "Ms. Emma Thompson",
      subject: "English & Literature",
      bio: "Cambridge graduate specializing in English Literature and Language. Passionate about creative writing.",
      rating: 4.9,
      students: 180,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      badges: ["Top Rated", "Cambridge"]
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating) 
            ? "text-yellow-400 fill-yellow-400" 
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-gradient-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our Top Tutors
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn from the best educators with proven track records
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutors.map((tutor, index) => (
            <Card
              key={tutor.id}
              className="group overflow-hidden hover:shadow-glow transition-all duration-300 hover:-translate-y-2 border-border/50 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="w-24 h-24 mb-4 ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all">
                    <AvatarImage src={tutor.image} alt={tutor.name} />
                    <AvatarFallback className="text-lg font-semibold bg-gradient-primary text-white">
                      {tutor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {tutor.badges.map((badge, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {badge}
                      </Badge>
                    ))}
                  </div>

                  <h3 className="text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {tutor.name}
                  </h3>
                  <p className="text-primary font-medium mb-3">{tutor.subject}</p>
                  
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {tutor.bio}
                  </p>

                  <div className="flex items-center justify-center gap-4 mb-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      {renderStars(tutor.rating)}
                      <span className="ml-1 font-medium">{tutor.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{tutor.students} students</span>
                    </div>
                  </div>

                  <div className="flex gap-2 w-full">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Profile
                    </Button>
                    <Button variant="default" size="sm" className="flex-1">
                      Book Demo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopTutors;
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import TutorProfileCard, { TutorProfile } from "@/components/TutorProfileCard";

const TopTutors = () => {
  const { ref, isVisible } = useScrollAnimation();
  const tutors: TutorProfile[] = [
    {
      id: "1",
      name: "Dr. Sarah Ahmed",
      subject: "Mathematics & Physics",
      gradeLevel: "O-Level / A-Level",
      bio: "PhD in Mathematical Physics with 8+ years of teaching experience. Specialized in O/A Level curriculum with proven track record.",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=400&h=400&fit=crop&crop=face",
      location: "Karachi, Pakistan",
      experience: 8,
      isVerified: true,
      languages: ["English", "Urdu"],
      topics: ["Algebra", "Calculus", "Physics", "Trigonometry"]
    },
    {
      id: "2",
      name: "Prof. Michael Chen",
      subject: "Chemistry & Biology",
      gradeLevel: "O-Level / A-Level",
      bio: "Former university lecturer with expertise in organic chemistry and molecular biology. 10+ years experience in Cambridge curriculum.",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      location: "Lahore, Pakistan",
      experience: 10,
      isVerified: true,
      languages: ["English", "Mandarin"],
      topics: ["Organic Chemistry", "Biology", "Biochemistry"]
    },
    {
      id: "3",
      name: "Ms. Emma Thompson",
      subject: "English & Literature",
      gradeLevel: "O-Level / A-Level",
      bio: "Cambridge graduate specializing in English Literature and Language. Passionate about creative writing and critical analysis.",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      location: "Islamabad, Pakistan",
      experience: 6,
      isVerified: true,
      languages: ["English"],
      topics: ["Literature", "Creative Writing", "Grammar", "Essay Writing"]
    }
  ];


  return (
    <section ref={ref} className="py-20 bg-gradient-section">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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
            <TutorProfileCard
              key={tutor.id}
              tutor={tutor}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` } as React.CSSProperties}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopTutors;
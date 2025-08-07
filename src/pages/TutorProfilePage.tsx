import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Star, MapPin, Calendar, Globe, Briefcase, Languages, ExternalLink, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TutorProfile } from "@/components/TutorProfileCard";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const TutorProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tutor, setTutor] = useState<TutorProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with Firebase call
  // useEffect(() => {
  //   const fetchTutorProfile = async () => {
  //     setLoading(true);
  //     // Simulate API call
  //     setTimeout(() => {
  //       const mockTutor: TutorProfile = {
  //         id: id || "1",
  //         name: "Dr. Sarah Ahmed",
  //         subject: "Mathematics & Physics",
  //         gradeLevel: "O-Level / A-Level",
  //         bio: "PhD in Mathematical Physics with 8+ years of teaching experience. I specialize in making complex mathematical concepts accessible and engaging for students. My approach combines theoretical understanding with practical problem-solving techniques that help students excel in their examinations and develop a genuine appreciation for mathematics and physics.",
  //         rating: 4.9,
  //         image: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=400&h=400&fit=crop&crop=face",
  //         location: "Karachi, Pakistan",
  //         experience: 8,
  //         isVerified: true,
  //         languages: ["English", "Urdu", "Arabic"],
  //         topics: [
  //           "Algebra", "Calculus", "Trigonometry", "Statistics",
  //           "Mechanics", "Thermodynamics", "Electromagnetism", "Wave Physics",
  //           "Differential Equations", "Linear Algebra", "Quantum Physics"
  //         ],
  //         linkedinUrl: "https://linkedin.com/in/sarah-ahmed-phd"
  //       };
  //       setTutor(mockTutor);
  //       setLoading(false);
  //     }, 1000);
  //   };

  //   fetchTutorProfile();
  // }, [id]);

  useEffect(() => {
    const fetchTutorProfile = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const docRef = doc(db, "tutors", id);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          setTutor({ id: snapshot.id, ...snapshot.data() } as TutorProfile);
        }
      } catch (error) {
        console.error("Error fetching tutor profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutorProfile();
  }, [id]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${index < Math.floor(rating)
          ? "text-yellow-400 fill-yellow-400"
          : "text-muted-foreground/30"
          }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-section flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading tutor profile...</p>
        </div>
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="min-h-screen bg-gradient-section flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-foreground">Tutor Not Found</h1>
          <p className="text-muted-foreground">The tutor profile you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/")} variant="outline">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-section">
      {/* Hero Section */}
      <div className="relative bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="mb-8 hover:bg-background/20"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <Avatar className="w-32 h-32 lg:w-40 lg:h-40 ring-8 ring-background/20 shadow-elegant">
                <AvatarImage src={tutor.image} alt={tutor.name} className="object-cover" />
                <AvatarFallback className="text-3xl font-bold bg-gradient-primary text-primary-foreground">
                  {tutor.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {tutor.isVerified && (
                <Badge
                  variant="default"
                  className="absolute -bottom-2 -right-2 bg-accent text-accent-foreground px-3 py-1"
                >
                  ✓ Verified Tutor
                </Badge>
              )}
            </div>

            {/* Basic Info */}
            <div className="flex-1 text-center lg:text-left space-y-4">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                  {tutor.name}
                </h1>
                <p className="text-xl text-primary font-semibold mb-1">{tutor.subject}</p>
                <p className="text-muted-foreground">{tutor.gradeLevel}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <div className="flex items-center gap-1">
                  {renderStars(tutor.rating)}
                </div>
                <span className="text-lg font-semibold text-foreground">{tutor.rating}</span>
                <span className="text-muted-foreground">rating</span>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{tutor.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Briefcase className="h-4 w-4" />
                  <span>{tutor.experience}+ years experience</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Languages className="h-4 w-4" />
                  <span>{tutor.languages?.join(", ")}</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="bg-gradient-primary hover:opacity-90 text-primary-foreground"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Book a Session
                </Button>
                {tutor.linkedinUrl && (
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => window.open(tutor.linkedinUrl, '_blank')}
                  >
                    <ExternalLink className="h-5 w-5 mr-2" />
                    LinkedIn Profile
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-foreground">About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {tutor.bio}
                </p>
              </CardContent>
            </Card>

            {/* Topics Section */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-foreground">Teaching Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {tutor.topics?.map((topic, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="px-3 py-1 bg-gradient-to-r from-primary/10 to-accent/10 text-foreground hover:from-primary/20 hover:to-accent/20 transition-all"
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info Card */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Location</p>
                    <p className="text-sm text-muted-foreground">{tutor.location}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Experience</p>
                    <p className="text-sm text-muted-foreground">{tutor.experience}+ years</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center gap-3">
                  <Languages className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Languages</p>
                    <p className="text-sm text-muted-foreground">{tutor.languages?.join(", ")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Request This Tutor
                </Button>
                {tutor.linkedinUrl && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => window.open(tutor.linkedinUrl, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View LinkedIn
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorProfilePage;
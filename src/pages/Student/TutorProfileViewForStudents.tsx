import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Star,
  Calendar,
  MessageCircle,
  BookOpen,
  Award,
  Clock,
  GraduationCap,
  FileText,
  ArrowLeft
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useEffect, useState } from "react";


const TutorProfileViewForStudents = () => {
  const { uid } = useParams();
  // Mock tutor data - would come from API in real app
  // const tutor = {
  //   // id: tutorId || "1",
  //   // name: "Dr. Emily Chen",
  //   // avatar: "/placeholder.svg",
  //   // title: "Mathematics & Physics Specialist",
  //   // bio: "Experienced educator with 8+ years teaching A-Level Mathematics and Physics. PhD in Applied Mathematics from Cambridge University. Passionate about helping students achieve their academic goals through personalized learning approaches.",
  //   // rating: 4.9,
  //   // totalReviews: 127,
  //   // subjects: ["Mathematics", "Physics", "Further Mathematics", "Statistics"],
  //   // availability: "Mon-Fri: 3:00 PM - 8:00 PM, Sat: 10:00 AM - 4:00 PM",
  //   // achievements: ["PhD Mathematics", "Top 5% Tutor", "500+ Hours Taught"],
  //   // experience: "8+ years",
  //   // sessionPrice: "£45/hour",
  //   // responseTime: "Usually responds within 2 hours"
  // };
  //const achievements = ["PhD Mathematics", "Top 5% Tutor", "500+ Hours Taught"];
  //   // experience: "8+ years",
  const [TutorData, setTutorData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutorData = async () => {
      try {
        const docRef = doc(db, "tutors", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setTutorData(docSnap.data());
        } else {
          console.log("No such tutor!");
        }
      } catch (err) {
        console.error("Error fetching tutors data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTutorData();
  }, [uid]);

  const reviews = [
    {
      student: "Alex M.",
      rating: 5,
      comment: "Excellent teacher! Helped me improve my A-Level Maths grade from C to A*.",
      date: "2 weeks ago"
    },
    {
      student: "Sarah K.",
      rating: 5,
      comment: "Very patient and explains complex physics concepts clearly.",
      date: "1 month ago"
    },
    {
      student: "James R.",
      rating: 4,
      comment: "Great tutor, really knows the curriculum well.",
      date: "2 months ago"
    }
  ];
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading tutor profile...
      </div>
    );
  }
  if (!TutorData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-semibold">
        Failed to load student data.
      </div>
    );
  }
  if (TutorData.status.toLowerCase() != 'done') {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-semibold">
        Tutor is not yet approved to view
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-section">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border shadow-elegant">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/student/dashboard" className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Dashboard</span>
              </Link>
            </Button>
            <div className="flex-1 text-center">
              <Link to="/" className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                TutorsPool
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Main Profile Card */}
        <Card className="shadow-elegant bg-card/50 backdrop-blur-sm border-border">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Info */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-start space-x-6">
                  <Avatar className="h-24 w-24 shadow-md">
                    <AvatarImage src={TutorData?.avatar} alt={TutorData?.firstName ?? ""} />
                    <AvatarFallback className="text-xl">
                      {TutorData?.firstName?.[0] ?? "" + (TutorData.lastName[0]) ? TutorData.lastName[0] : ""}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-3">
                    <div>
                      <h1 className="text-3xl font-bold text-foreground">{TutorData?.firstName || TutorData?.lastName
                        ? `${TutorData?.firstName ?? ""} ${TutorData?.lastName ?? ""}`
                        : "N/A"}</h1>
                      <p className="text-lg text-muted-foreground">{TutorData?.status
                        ? `${TutorData.status.charAt(0).toUpperCase()}${TutorData.status.slice(1).toLowerCase()}`
                        : "N/A"}
                      </p>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-5 w-5 ${star <= Math.floor(TutorData.rating ?? 0)
                              ? "text-yellow-400 fill-current"
                              : "text-muted-foreground"
                              }`}
                          />
                        ))}
                        <span className="font-semibold text-foreground">{TutorData?.rating ?? ""}</span>
                        <span className="text-muted-foreground">({TutorData?.totalReviews ?? " "} reviews)</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {TutorData.courses?.map((subject) => (
                        <Badge key={subject} variant="secondary" className="bg-gradient-primary text-white">
                          {subject ?? ""}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">About</h3>
                  <p className="text-muted-foreground leading-relaxed">{TutorData.bio ?? ""}</p>
                </div>
              </div>

              {/* Quick Stats & Actions */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                  <div className="p-4 rounded-2xl bg-gradient-section shadow-md">
                    <div className="flex items-center space-x-2 mb-1">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Experience</span>
                    </div>
                    <p className="text-lg font-semibold">{TutorData.experience ?? "" + " Years"}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-gradient-section shadow-md">
                    <div className="flex items-center space-x-2 mb-1">
                      <BookOpen className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Price</span>
                    </div>
                    <p className="text-lg font-semibold">{TutorData.sessionPrice ?? ""}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button size="lg" className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300">
                    <Calendar className="h-5 w-5 mr-2" />
                    Book Session
                  </Button>

                  <Button variant="outline" size="lg" className="w-full hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Message Tutor
                  </Button>
                </div>

                <div className="p-4 rounded-2xl bg-muted/30 border border-border">
                  <p className="text-sm text-muted-foreground text-center">{TutorData.responseTime}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Details Tabs */}
        <Tabs defaultValue="availability" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="availability">Availability</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="availability">
            <Card className="shadow-elegant bg-card/50 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Availability</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-gradient-section">
                    <p className="font-medium mb-2">Current Schedule:</p>
                    <p className="text-muted-foreground">{TutorData.availability}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Book a session to see real-time availability and schedule your preferred time slot.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements">
            <Card className="shadow-elegant bg-card/50 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>Achievements & Qualifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {TutorData.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-3 p-4 rounded-xl bg-gradient-section">
                      <div className="p-2 rounded-lg bg-gradient-primary shadow-sm">
                        <GraduationCap className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-medium">{achievement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card className="shadow-elegant bg-card/50 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5" />
                  <span>Student Reviews</span>
                </CardTitle>
                <CardDescription>
                  What students say about {TutorData.firstName + " " + TutorData.lastName}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reviews.map((review, index) => (
                    <div key={index} className="p-4 rounded-xl bg-gradient-section border border-border">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{review.student}</span>
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-3 w-3 ${star <= review.rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-muted-foreground"
                                  }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">{review.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TutorProfileViewForStudents;
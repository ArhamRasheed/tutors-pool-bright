import { ArrowLeft, Clock, BookOpen, Star, User, Calendar } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { FadeInSection } from '@/components/FadeInSection';
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase"; // apne firebase config ka import

export const CourseDetails: React.FC = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const docRef = doc(db, "courses", courseId!);
        const docSnap = await getDoc(docRef);
        console.log(courseId);
        if (docSnap.exists()) {
          setCourse(docSnap.data());
        } else {
          console.error("No such course found!");
        }
      } catch (err) {
        console.error("Error fetching course:", err);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  const handleBackClick = () => {
    navigate(-1);
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (!course) {
    return <div className="p-8 text-center">Course not found.</div>;
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${index < Math.floor(rating)
          ? 'fill-yellow-400 text-yellow-400'
          : 'text-muted-foreground'
          }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-section">
      {/* Header with Back Button */}
      <FadeInSection direction="down" className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={handleBackClick}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Courses
          </Button>
        </div>
      </FadeInSection>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Course Title */}
        <FadeInSection direction="up" className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
            {course.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {course.description}
          </p>
        </FadeInSection>

        {/* Course Banner */}
        <FadeInSection direction="up" delay={100}>
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-elegant">
            <img
              src={course.coverImage}
              alt={course.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-hero opacity-20" />
          </div>
        </FadeInSection>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Overview */}
            <FadeInSection direction="up" delay={200}>
              <Card className="shadow-md">
                <CardHeader>
                  <h2 className="text-2xl font-semibold flex items-center gap-2">
                    <BookOpen className="h-6 w-6 text-primary" />
                    Course Overview
                  </h2>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {course.fullDescription}
                  </p>
                </CardContent>
              </Card>
            </FadeInSection>

            {/* Topics Covered */}
            <FadeInSection direction="up" delay={300}>
              <Card className="shadow-md">
                <CardHeader>
                  <h2 className="text-2xl font-semibold">Topics Covered</h2>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-3">
                    {course.topicsCovered?.map((topic: string, index: number) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{topic}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeInSection>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Info Card */}
            <FadeInSection direction="left" delay={400}>
              <Card className="shadow-md sticky top-24">
                <CardHeader>
                  <h3 className="text-xl font-semibold">Course Information</h3>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Quick Details */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Grade Level</span>
                      <Badge variant="secondary">{course.level}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Subject</span>
                      <Badge variant="outline">{course.title}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Duration
                      </span>
                      <span className="font-medium">{course.duration || "N/A"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Est. Time
                      </span>
                      <span className="font-medium">{course.estimatedTime || "N/A"}</span>
                    </div>
                  </div>

                  <Separator />

                  {/* Tutor Information */}
                  {course.tutor && (
                    <div className="space-y-4">
                      <h4 className="font-semibold flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Your Tutor
                      </h4>
                      <Link
                        to={`/tutor/${course.tutor.id}`}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={course.tutor.avatar} alt={course.tutor.name} />
                          <AvatarFallback>{course.tutor.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium">{course.tutor.name}</p>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center">
                              {renderStars(course.tutor.rating)}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {course.tutor.rating} ({course.tutor.totalReviews} reviews)
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )}

                  <Separator />

                  {/* CTA Button */}
                  <Button
                    variant="hero"
                    size="lg"
                    className="w-full"
                    onClick={() => console.log("Enroll clicked")}
                  >
                    Start Learning
                  </Button>
                </CardContent>
              </Card>
            </FadeInSection>
          </div>
        </div>
      </div>
    </div>
  );
};

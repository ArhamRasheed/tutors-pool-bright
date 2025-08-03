import { Star, Download, Play, MessageCircle, Calendar, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface TutorData {
  name: string;
  subjects: string[];
  rating: number;
  totalReviews: number;
  yearsExperience: number;
  totalStudents: number;
  bio: string;
  qualifications: string[];
}

export interface PastPaper {
  id: number;
  subject: string;
  year: string;
  board: string;
  downloads: number;
}

export interface Resource {
  id: number;
  title: string;
  type: "Video" | "PDF";
  duration?: string;
  pages?: number;
  views?: number;
  downloads?: number;
}

export interface Review {
  id: number;
  student: string;
  rating: number;
  comment: string;
  date: string;
}

interface TutorProfileProps {
  tutor: TutorData;
  pastPapers: PastPaper[];
  resources: Resource[];
  reviews: Review[];
}

export default function TutorProfile({
  tutor,
  pastPapers,
  resources,
  reviews,
}: TutorProfileProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header Section */}
      <Card className="shadow-elegant bg-gradient-card">
        <CardContent className="p-8">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground">
              {tutor.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">{tutor.name}</h1>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(tutor.rating)
                              ? "fill-warning text-warning"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold text-foreground">{tutor.rating}</span>
                    <span className="text-muted-foreground">
                      ({tutor.totalReviews} reviews)
                    </span>
                  </div>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {tutor.subjects.map((subject) => (
                      <Badge key={subject} variant="secondary">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Message
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Calendar className="h-4 w-4" />
                    Book Session
                  </Button>
                </div>
              </div>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                {tutor.bio}
              </p>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <p className="text-2xl font-bold text-foreground">
                    {tutor.yearsExperience}
                  </p>
                  <p className="text-sm text-muted-foreground">Years Experience</p>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <p className="text-2xl font-bold text-foreground">
                    {tutor.totalStudents}+
                  </p>
                  <p className="text-sm text-muted-foreground">Students Taught</p>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <p className="text-2xl font-bold text-foreground">
                    {tutor.rating}
                  </p>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Qualifications */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Qualifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {tutor.qualifications.map((qual, index) => (
              <div key={index} className="flex items-center gap-3 p-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-foreground">{qual}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tabbed Sections */}
      <Tabs defaultValue="papers" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="papers">Past Papers</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="papers">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Solved Past Papers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pastPapers.map((paper) => (
                  <div
                    key={paper.id}
                    className="p-4 bg-muted/30 rounded-lg border border-border/50 hover:shadow-card transition-all"
                  >
                    <h3 className="font-semibold text-foreground">{paper.subject}</h3>
                    <p className="text-sm text-muted-foreground">
                      {paper.board} • {paper.year}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-muted-foreground">
                        {paper.downloads} downloads
                      </span>
                      <Button size="sm" variant="outline" className="gap-2">
                        <Download className="h-3 w-3" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Uploaded Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resources.map((resource) => (
                  <div
                    key={resource.id}
                    className="p-4 bg-muted/30 rounded-lg border border-border/50 hover:shadow-card transition-all"
                  >
                    <div className="flex items-start gap-3">
                      {resource.type === "Video" ? (
                        <Play className="h-8 w-8 text-accent mt-1" />
                      ) : (
                        <Download className="h-8 w-8 text-destructive mt-1" />
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{resource.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {resource.type === "Video"
                            ? `${resource.duration} • ${resource.views} views`
                            : `${resource.pages} pages • ${resource.downloads} downloads`}
                        </p>
                        <Button size="sm" variant="outline" className="mt-2 gap-2">
                          {resource.type === "Video" ? (
                            <>
                              <Play className="h-3 w-3" />
                              Watch
                            </>
                          ) : (
                            <>
                              <Download className="h-3 w-3" />
                              Download
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Student Reviews</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="p-4 bg-muted/30 rounded-lg border border-border/50"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{review.student}</span>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < review.rating
                                ? "fill-warning text-warning"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{review.date}</span>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Intro Video */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Introduction Video</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-muted/50 rounded-lg flex items-center justify-center border border-border/50">
            <div className="text-center">
              <Play className="h-16 w-16 text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">
                Watch {tutor.name.split(" ")[0]}'s introduction video
              </p>
              <Button variant="outline" className="mt-4 gap-2">
                <Play className="h-4 w-4" />
                Play Video
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

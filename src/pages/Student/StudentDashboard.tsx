import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LayoutDashboard, 
  Calendar, 
  BookOpen, 
  FolderOpen, 
  Brain, 
  MessageCircle,
  Flame,
  Clock,
  Bell,
  TrendingUp,
  Plus,
  ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../lib/firebase"; // adjust path to your firebase config
import { onAuthStateChanged } from "firebase/auth";


const StudentDashboard = () => {
  // Mock student data
  // const student = {
  //   name: "Sarah Johnson",
  //   avatar: "/placeholder.svg",
  //   grade: "AS Level",
  //   currentStreak: 12,
  //   nextSession: "Today, 3:00 PM - Mathematics",
  //   completedSessions: 24,
  //   pendingAssignments: 3
  // };

  // const sidebarItems = [
  //   { name: "Dashboard", icon: LayoutDashboard, href: "/student/dashboard", active: true },
  //   { name: "Sessions", icon: Calendar, href: "/student/sessions" },
  //   { name: "Assignments", icon: BookOpen, href: "/student/assignments" },
  //   { name: "Resources", icon: FolderOpen, href: "/student/resources" },
  //   { name: "Flashcards", icon: Brain, href: "/student/flashcards" },
  // ];

  // const recentSessions = [
  //   { subject: "Mathematics", tutor: "Dr. Emily Chen", date: "Yesterday", rating: 5 },
  //   { subject: "Physics", tutor: "Prof. James Wilson", date: "2 days ago", rating: 4 },
  //   { subject: "Chemistry", tutor: "Dr. Sarah Parker", date: "3 days ago", rating: 5 },
  // ];

  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "students", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setStudent(docSnap.data());
          } else {
            console.error("No such student document!");
          }
        } catch (error) {
          console.error("Error fetching student data:", error);
        } finally {
          setLoading(false);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!student) {
    return <div className="flex items-center justify-center h-screen">No student data found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-section">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border shadow-elegant">
        <div className="max-w-full px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                TutorsPool
              </Link>
              <div className="hidden md:flex items-center sapace-x-6">
                <Link to="/student/dashboard" className="text-foreground hover:text-primary transition-all duration-300 font-medium">
                  My Learning
                </Link>
                <Link to="/explore" className="text-muted-foreground hover:text-primary transition-all duration-300 font-medium">
                  Explore Courses
                </Link>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage src={student.avatar} alt={student.name} />
                <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </nav>

      {/* Streak Bar */}
      <div className="bg-gradient-primary px-6 py-3 shadow-sm">
        <div className="max-w-full flex items-center justify-center">
          <div className="flex items-center space-x-2 text-white">
            <Flame className="h-5 w-5" />
            <span className="font-semibold">{student.currentStreak} Day Learning Streak!</span>
            <span className="text-white/80">Keep it up! 🎉</span>
          </div>
        </div>
      </div>

      <div className="flex min-h-screen">
        {/* Left Sidebar */}
        <aside className="w-64 bg-card/50 backdrop-blur-sm border-r border-border sticky top-[129px] h-[calc(100vh-129px)] shadow-elegant">
          <div className="p-6">
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 hover:shadow-md ${
                    item.active 
                      ? "bg-gradient-primary text-white font-medium shadow-glow" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
            
            {/* Chat Section */}
            <div className="mt-8 p-4 rounded-xl bg-gradient-section border border-border">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-gradient-primary shadow-sm">
                  <MessageCircle className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium">Need Help?</p>
                  <p className="text-xs text-muted-foreground">Chat with tutors</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Student Info Header */}
            <Card className="shadow-elegant bg-card/50 backdrop-blur-sm border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16 shadow-md">
                      <AvatarImage src={student.avatar} alt={student.name} />
                      <AvatarFallback className="text-lg">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h1 className="text-2xl font-bold text-foreground">Welcome back, {student.name.split(' ')[0]}!</h1>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="secondary" className="bg-gradient-primary text-white">
                          {student.grade}
                        </Badge>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{student.completedSessions} sessions completed</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                    <Plus className="h-4 w-4 mr-2" />
                    Book Session
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Next Session Card */}
              <Card className="shadow-elegant bg-card/50 backdrop-blur-sm border-border hover:shadow-glow transition-all duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <Clock className="h-5 w-5 text-primary" />
                    <span>Next Session</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="font-semibold text-foreground">{student.nextSession?.date?.toDate().toLocaleString()} - {student.nextSession?.subject}</p>
                    <div className="flex items-center justify-between">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button size="sm" className="bg-gradient-primary">
                        Join Session
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pending Assignments */}
              <Card className="shadow-elegant bg-card/50 backdrop-blur-sm border-border hover:shadow-glow transition-all duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <span>Assignments</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-2xl font-bold text-foreground">{student.pendingAssignments}</p>
                    <p className="text-sm text-muted-foreground">Pending tasks</p>
                    <Button variant="outline" size="sm" className="w-full">
                      View All
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Progress Summary */}
              <Card className="shadow-elegant bg-card/50 backdrop-blur-sm border-border hover:shadow-glow transition-all duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <span>Progress</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">85%</p>
                    <p className="text-sm text-muted-foreground">Average grade improvement</p>
                    <Button variant="outline" size="sm" className="w-full">
                      View Analytics
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Sessions */}
            <Card className="shadow-elegant bg-card/50 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Recent Sessions</span>
                  <Button variant="outline" size="sm">
                    View All
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSessions.map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-gradient-section hover:shadow-md transition-all duration-300">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 rounded-lg bg-gradient-primary shadow-sm">
                          <BookOpen className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">{session.subject}</p>
                          <p className="text-sm text-muted-foreground">with {session.tutor}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">{session.date}</p>
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star} className={`text-xs ${star <= session.rating ? "text-yellow-400" : "text-muted-foreground"}`}>
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
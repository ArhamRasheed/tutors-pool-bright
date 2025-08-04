// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { 
//   LayoutDashboard, 
//   Calendar, 
//   BookOpen, 
//   FolderOpen, 
//   Brain, 
//   MessageCircle,
//   Flame,
//   Clock,
//   GraduationCap,
//   School,
//   Mail,
//   CalendarDays
// } from "lucide-react";
// import { Link } from "react-router-dom";

// const StudentProfile = () => {
//   // Mock student data
//   const student = {
//     name: "Sarah Johnson",
//     email: "sarah.johnson@email.com",
//     grade: "AS Level",
//     school: "Wellington College",
//     joinedDate: "September 2024",
//     currentStreak: 12,
//     avatar: "/placeholder.svg"
//   };

//   const sidebarItems = [
//     { name: "Dashboard", icon: LayoutDashboard, href: "/student/dashboard", active: true },
//     { name: "Sessions", icon: Calendar, href: "/student/sessions" },
//     { name: "Assignments", icon: BookOpen, href: "/student/assignments" },
//     { name: "Resources", icon: FolderOpen, href: "/student/resources" },
//     { name: "Flashcards", icon: Brain, href: "/student/flashcards" },
//     { name: "Chat", icon: MessageCircle, href: "/student/chat" },
//   ];

//   const quickStats = [
//     { label: "Upcoming Session", value: "Today, 3:00 PM", icon: Clock },
//     { label: "Pending Assignments", value: "3 tasks", icon: BookOpen },
//     { label: "Recent Flashcards", value: "Mathematics Set", icon: Brain },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-section">
//       {/* Top Navigation */}
//       <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border shadow-elegant">
//         <div className="max-w-full px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-8">
//               <Link to="/" className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
//                 TutorsPool
//               </Link>
//               <div className="hidden md:flex items-center space-x-6">
//                 <Link to="/student" className="text-foreground hover:text-primary transition-all duration-300 font-medium">
//                   My Learning
//                 </Link>
//                 <Link to="/explore" className="text-muted-foreground hover:text-primary transition-all duration-300 font-medium">
//                   Explore Courses
//                 </Link>
//               </div>
//             </div>
            
//             {/* Streak Widget */}
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center space-x-2 bg-gradient-primary px-3 py-2 rounded-full shadow-glow">
//                 <Flame className="h-4 w-4 text-white" />
//                 <span className="text-sm font-medium text-white">{student.currentStreak} day streak</span>
//               </div>
              
//               <Avatar className="h-8 w-8">
//                 <AvatarImage src={student.avatar} alt={student.name} />
//                 <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
//               </Avatar>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <div className="flex min-h-screen">
//         {/* Sidebar */}
//         <aside className="w-64 bg-card/50 backdrop-blur-sm border-r border-border sticky top-[73px] h-[calc(100vh-73px)] shadow-elegant">
//           <div className="p-6">
//             <nav className="space-y-2">
//               {sidebarItems.map((item) => (
//                 <Link
//                   key={item.name}
//                   to={item.href}
//                   className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-300 hover:shadow-md ${
//                     item.active 
//                       ? "bg-gradient-primary text-white font-medium shadow-glow" 
//                       : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
//                   }`}
//                 >
//                   <item.icon className="h-5 w-5" />
//                   <span>{item.name}</span>
//                 </Link>
//               ))}
//             </nav>
//           </div>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 p-6">
//           <div className="max-w-4xl mx-auto space-y-6">
//             {/* Header */}
//             <div className="space-y-2">
//               <h1 className="text-3xl font-bold text-foreground">Student Profile</h1>
//               <p className="text-muted-foreground">Manage your learning journey and track your progress</p>
//             </div>

//             {/* Student Info Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Personal Information */}
//               <Card className="shadow-elegant bg-card/50 backdrop-blur-sm border-border hover:shadow-glow transition-all duration-300">
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-2">
//                     <GraduationCap className="h-5 w-5" />
//                     <span>Personal Information</span>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="flex items-center space-x-4">
//                     <Avatar className="h-16 w-16">
//                       <AvatarImage src={student.avatar} alt={student.name} />
//                       <AvatarFallback className="text-lg">
//                         {student.name.split(' ').map(n => n[0]).join('')}
//                       </AvatarFallback>
//                     </Avatar>
//                     <div>
//                       <h3 className="text-lg font-semibold">{student.name}</h3>
//                       <div className="bg-gradient-primary px-2 py-1 rounded-full">
//                         <span className="text-xs font-medium text-white">{student.grade}</span>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <Separator />
                  
//                   <div className="space-y-3">
//                     <div className="flex items-center space-x-3">
//                       <Mail className="h-4 w-4 text-muted-foreground" />
//                       <span className="text-sm">{student.email}</span>
//                     </div>
//                     <div className="flex items-center space-x-3">
//                       <School className="h-4 w-4 text-muted-foreground" />
//                       <span className="text-sm">{student.school}</span>
//                     </div>
//                     <div className="flex items-center space-x-3">
//                       <CalendarDays className="h-4 w-4 text-muted-foreground" />
//                       <span className="text-sm">Joined {student.joinedDate}</span>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Learning Stats */}
//               <Card className="shadow-elegant bg-card/50 backdrop-blur-sm border-border hover:shadow-glow transition-all duration-300">
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-2">
//                     <Flame className="h-5 w-5" />
//                     <span>Learning Progress</span>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-center space-y-4">
//                     <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary shadow-glow">
//                       <Flame className="h-10 w-10 text-white" />
//                     </div>
//                     <div>
//                       <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">{student.currentStreak}</div>
//                       <div className="text-sm text-muted-foreground">Day Learning Streak</div>
//                     </div>
//                     <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground transition-all duration-300">
//                       View Full Stats
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Quick Links */}
//             <Card className="shadow-elegant bg-card/50 backdrop-blur-sm border-border hover:shadow-glow transition-all duration-300">
//               <CardHeader>
//                 <CardTitle>Quick Access</CardTitle>
//                 <CardDescription>Your recent activities and upcoming tasks</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   {quickStats.map((stat, index) => (
//                     <div key={index} className="p-4 rounded-lg bg-gradient-section hover:shadow-md transition-all duration-300 cursor-pointer group">
//                       <div className="flex items-center space-x-3">
//                         <div className="p-2 rounded-lg bg-gradient-primary shadow-sm group-hover:shadow-glow transition-all duration-300">
//                           <stat.icon className="h-4 w-4 text-white" />
//                         </div>
//                         <div>
//                           <div className="text-sm font-medium">{stat.label}</div>
//                           <div className="text-xs text-muted-foreground">{stat.value}</div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </main>

//         {/* Chat Button */}
//         <div className="fixed bottom-6 right-6">
//           <Button size="icon" className="h-12 w-12 rounded-full bg-gradient-primary shadow-glow hover:shadow-elegant transition-all duration-300 animate-glow">
//             <MessageCircle className="h-6 w-6" />
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentProfile;
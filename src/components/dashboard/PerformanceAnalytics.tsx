import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { BarChart3, TrendingUp, Award, Clock } from "lucide-react";

const subjectProgress = [
  { subject: "Mathematics", progress: 85, grade: "A", trend: "+5%" },
  { subject: "Physics", progress: 78, grade: "B+", trend: "+3%" },
  { subject: "Chemistry", progress: 92, grade: "A*", trend: "+8%" },
  { subject: "Biology", progress: 75, grade: "B", trend: "+2%" },
];

const attendanceStats = [
  { month: "October", rate: 95, sessions: 20 },
  { month: "November", rate: 88, sessions: 18 },
  { month: "December", rate: 100, sessions: 16 },
];

export const PerformanceAnalytics = () => {
  return (
    <Card className="shadow-elegant border-border bg-card/50 backdrop-blur-sm hover:shadow-glow transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2 text-foreground">
          <BarChart3 className="h-5 w-5 text-primary" />
          <span>Performance Analytics</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="grades" className="w-full">
          <TabsList className="grid grid-cols-2 w-full bg-muted/50 border border-border">
            <TabsTrigger value="grades" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Grades</TabsTrigger>
            <TabsTrigger value="attendance" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Attendance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="grades" className="mt-6 space-y-4">
            {subjectProgress.map((subject) => (
              <div key={subject.subject} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="font-medium text-foreground">{subject.subject}</span>
                    <div className="flex items-center space-x-1 text-accent text-sm">
                      <TrendingUp className="h-3 w-3" />
                      <span>{subject.trend}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4 text-amber-500" />
                    <span className="font-semibold text-foreground">{subject.grade}</span>
                  </div>
                </div>
                <Progress value={subject.progress} className="h-2" />
                <div className="text-xs text-muted-foreground text-right">{subject.progress}%</div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="attendance" className="mt-6 space-y-4">
            {attendanceStats.map((stat) => (
              <div key={stat.month} className="flex items-center justify-between p-4 rounded-xl bg-gradient-section border border-border">
                <div>
                  <div className="font-medium text-foreground">{stat.month}</div>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{stat.sessions} sessions</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-accent">{stat.rate}%</div>
                  <div className="text-xs text-muted-foreground">attendance</div>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};